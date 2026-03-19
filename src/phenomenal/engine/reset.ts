import type { QuizState } from "@/phenomenal/types/engine";
import { startQuiz } from "./start";

export function resetQuiz(mode: QuizState["mode"] = "random") {
  return startQuiz(mode);
}
