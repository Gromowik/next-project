import { questions } from "./questions";

export function updateQuestion(
  id: string,
  payload: { importance?: number; comment?: string; incrementFrequency?: boolean }
) {
  const question = questions.find((q) => q.id === id);
  if (!question) return null;

  if (typeof payload.importance === "number") {
    question.importance = payload.importance;
  }
  if (payload.comment) {
    question.comments.push(payload.comment);
  }
  if (payload.incrementFrequency) {
    question.f += 1;
  }

  return question;
}
