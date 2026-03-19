import { flows } from "./flows";
import type { QuizFlow } from "@/phenomenal/types/flow";

export function createFlow(flow: QuizFlow) {
  flows.push(flow);
  return flow;
}
