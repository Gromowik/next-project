import { flows } from "./flows";
import type { FlowStep } from "@/phenomenal/types/flow";

export function addFlowStep(flowId: string, step: FlowStep) {
  const flow = flows.find((f) => f.id === flowId);
  if (!flow) return null;

  flow.steps.push(step);
  return flow;
}
