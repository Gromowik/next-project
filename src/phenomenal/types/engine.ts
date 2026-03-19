import type { MplusBeacon } from "./mplus";
import type { FlowStep } from "./flow";

export type EngineMode = "random" | "weighted";

export type QuizState = {
  currentBeacon: MplusBeacon | null;
  steps: FlowStep[];
  finished: boolean;
  mode: EngineMode;
  summary?: {
    score: number;
    importance: number;
    flowId?: string;
  };
};
