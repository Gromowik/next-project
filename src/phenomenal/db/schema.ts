// Заглушка под схему БД (Drizzle/Prisma).
// Слой создан по структуре из way.md.

export const schema = {
  questions: "questions",
  beacons: "mplus_beacons",
  principles: "rf_principles",
  flows: "flows",
  flowSteps: "flow_steps",
} as const;
