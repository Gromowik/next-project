import { findQuestionById } from "@/phenomenal/r/find-by-id";
import { updateQuestion } from "@/phenomenal/r/update-question";
import { updateBeaconFrequency } from "@/phenomenal/mplus/update-frequency";
import { updateBeaconImportance } from "@/phenomenal/mplus/update-importance";
import type { QuizState } from "@/phenomenal/types/engine";

export function answerQuestion(
  state: QuizState,
  payload: { answer: string; comment?: string; importance?: number }
): QuizState {
  const beacon = state.currentBeacon;
  if (!beacon) return state;

  const question = findQuestionById(beacon.questionId);
  if (!question) return state;

  const correct = payload.answer === question.correct;
  const importance = payload.importance ?? question.importance;

  updateQuestion(question.id, {
    comment: payload.comment,
    importance,
    incrementFrequency: true,
  });
  updateBeaconFrequency(beacon.id);
  updateBeaconImportance(beacon.id, importance);

  return {
    ...state,
    steps: [
      ...state.steps,
      {
        questionId: question.id,
        answer: payload.answer,
        correct,
        comment: payload.comment,
        importance,
      },
    ],
  };
}
