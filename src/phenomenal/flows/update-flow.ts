import { flows } from "./flows";

export function updateFlow(
  flowId: string,
  payload: Partial<{ score: number; importance: number; incrementFrequency: boolean }>
) {
  const flow = flows.find((f) => f.id === flowId);
  if (!flow) return null;

  if (typeof payload.score === "number") flow.O.score = payload.score;
  if (typeof payload.importance === "number") flow.O.importance = payload.importance;
  if (payload.incrementFrequency) flow.O.f += 1;

  return flow;
}
