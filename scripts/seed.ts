import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import { getDb } from "@/core/db/client";
import { quizFlows, quizFlowSteps, users } from "@/core/db/schema";
import { hashPassword } from "@/core/auth/password";

async function runSeed() {
  const db = getDb();
  const email = "demo@next-learning.local";

  
  const [existing] = await db.select().from(users).where(eq(users.email, email)).limit(1);

  if (existing) {
    console.log("Seed skipped: demo user already exists");
    return;
  }

  const userId = randomUUID();
  const flowId = randomUUID();

  const passwordHash = await hashPassword("DemoPass1234");

  await db.insert(users).values({
    id: userId,
    email,
    name: "Demo User",
    passwordHash,
  });

  await db.insert(quizFlows).values({
    id: flowId,
    userId,
    sequence: 1,
    score: 1,
    total: 2,
    importance: 5,
    finishedAt: new Date(),
  });

  await db.insert(quizFlowSteps).values([
    {
      id: `${flowId}:1`,
      flowId,
      position: 0,
      questionId: "q-1",
      answer: "A",
      correct: true,
      comment: "Seed example",
      importance: 3,
    },
    {
      id: `${flowId}:2`,
      flowId,
      position: 1,
      questionId: "q-2",
      answer: "B",
      correct: false,
      comment: "Seed example",
      importance: 2,
    },
  ]);

  console.log("Seed completed. Login:");
  console.log("email:", email);
  console.log("password:", "DemoPass1234");
}

runSeed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });
