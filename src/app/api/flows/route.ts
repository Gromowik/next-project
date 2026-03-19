import { NextResponse } from "next/server";
import { z } from "zod";
import { requireSessionUser } from "@/core/auth";
import { listFlowsByUserId, saveFlowForUser } from "@/core/db/flows";
import type { QuizFlow } from "@/phenomenal/types/flow";

const flowStepSchema = z.object({
  questionId: z.string().min(1),
  answer: z.string().min(1),
  correct: z.boolean(),
  comment: z.string().optional(),
  importance: z.number().int().min(1).max(5),
});

const flowSchema = z.object({
  id: z.string().min(1),
  type: z.array(z.string()).default([]),
  O: z.object({
    score: z.number().int(),
    importance: z.number().int(),
    f: z.number().int(),
    finishedAt: z.string(),
  }),
  steps: z.array(flowStepSchema),
});

const postBodySchema = z.object({
  flow: flowSchema,
  sequence: z.number().int().min(1),
});

export async function GET() {
  const auth = await requireSessionUser();
  if (!auth.ok) return auth.response;

  const flows = await listFlowsByUserId(auth.session.sub);
  return NextResponse.json({ flows });
}

export async function POST(req: Request) {
  const auth = await requireSessionUser();
  if (!auth.ok) return auth.response;

  const body = await req.json().catch(() => null);
  const parsed = postBodySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: "Ungultige Eingabe" }, { status: 400 });
  }

  await saveFlowForUser({
    userId: auth.session.sub,
    flow: parsed.data.flow as QuizFlow,
    sequence: parsed.data.sequence,
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
