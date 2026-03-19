import { questions } from "./questions";

export function findQuestionById(id: string) {
  return questions.find((q) => q.id === id) ?? null;
}
