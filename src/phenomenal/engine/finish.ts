import { createFlow } from "@/phenomenal/flows/create-flow";
import type { QuizState } from "@/phenomenal/types/engine";

export function finishQuiz(state: QuizState): QuizState {
  const score = state.steps.filter((s) => s.correct).length;
  const importance = state.steps.reduce((sum, s) => sum + s.importance, 0);

  const flow = createFlow({
    id: `flow-${new Date().toISOString()}`,
    O: {
      finishedAt: new Date().toISOString(),
      score,
      importance,
      f: 1,
    },
    steps: state.steps,
    type: ["Rf_flows"],
  });

  return {
    ...state,
    finished: true,
    summary: { score, importance, flowId: flow.id },
  };
}
