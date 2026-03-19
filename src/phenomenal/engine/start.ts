import { findBeaconById } from "@/phenomenal/mplus/tree";
import type { QuizState } from "@/phenomenal/types/engine";

export function startQuiz(mode: QuizState["mode"] = "random"): QuizState {
  return {
    currentBeacon: findBeaconById("mplus-root"),
    steps: [],
    finished: false,
    mode,
  };
}
