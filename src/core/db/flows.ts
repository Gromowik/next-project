import { and, asc, eq } from "drizzle-orm";
import { getDb } from "@/core/db/client";
import { quizFlows, quizFlowSteps } from "@/core/db/schema";
import type { QuizFlow } from "@/phenomenal/types/flow";

export async function listFlowsByUserId(userId: string): Promise<QuizFlow[]> {
  const db = getDb();
  const rows = await db.select().from(quizFlows).where(eq(quizFlows.userId, userId)).orderBy(asc(quizFlows.sequence));

  const result: QuizFlow[] = [];
  for (const row of rows) {
    const steps = await db
      .select()
      .from(quizFlowSteps)
      .where(eq(quizFlowSteps.flowId, row.id))
      .orderBy(asc(quizFlowSteps.position));

    result.push({
      id: row.id,
      type: ["db"],
      O: {
        score: row.score,
        importance: row.importance,
        f: steps.length,
        finishedAt: row.finishedAt.toISOString(),
      },
      steps: steps.map((step) => ({
        questionId: step.questionId,
        answer: step.answer,
        correct: step.correct,
        comment: step.comment ?? undefined,
        importance: step.importance,
      })),
    });
  }

  return result;
}

export async function saveFlowForUser(input: {
  userId: string;
  flow: QuizFlow;
  sequence: number;
}): Promise<void> {
  const db = getDb();
  await db.transaction(async (trx) => {
    await trx.insert(quizFlows).values({
      id: input.flow.id,
      userId: input.userId,
      sequence: input.sequence,
      score: input.flow.O.score,
      total: input.flow.steps.length,
      importance: input.flow.O.importance,
      finishedAt: new Date(input.flow.O.finishedAt),
    });

    if (input.flow.steps.length === 0) return;

    await trx.insert(quizFlowSteps).values(
      input.flow.steps.map((step, index) => ({
        id: `${input.flow.id}:${index + 1}`,
        flowId: input.flow.id,
        position: index,
        questionId: step.questionId,
        answer: step.answer,
        correct: step.correct,
        comment: step.comment ?? null,
        importance: step.importance,
      })),
    );
  });
}

export async function getFlowById(userId: string, flowId: string): Promise<QuizFlow | null> {
  const db = getDb();
  const [flow] = await db
    .select()
    .from(quizFlows)
    .where(and(eq(quizFlows.id, flowId), eq(quizFlows.userId, userId)))
    .limit(1);

  if (!flow) return null;

  const steps = await db
    .select()
    .from(quizFlowSteps)
    .where(eq(quizFlowSteps.flowId, flow.id))
    .orderBy(asc(quizFlowSteps.position));

  return {
    id: flow.id,
    type: ["db"],
    O: {
      score: flow.score,
      importance: flow.importance,
      f: steps.length,
      finishedAt: flow.finishedAt.toISOString(),
    },
    steps: steps.map((step) => ({
      questionId: step.questionId,
      answer: step.answer,
      correct: step.correct,
      comment: step.comment ?? undefined,
      importance: step.importance,
    })),
  };
}
