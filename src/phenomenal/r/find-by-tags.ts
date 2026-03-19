import { questions } from "./questions";

export function findQuestionsByTags(tags: string[]) {
  return questions.filter((q) =>
    (q.tags ?? []).some((tag) => tags.includes(tag))
  );
}
