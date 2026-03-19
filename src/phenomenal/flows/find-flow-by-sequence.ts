import { flows } from "./flows";

export function findFlowBySequence(questionIds: string[]) {
  return flows.filter((flow) => {
    const ids = flow.steps.map((s) => s.questionId);
    if (ids.length !== questionIds.length) return false;
    return ids.every((id, idx) => id === questionIds[idx]);
  });
}
