import { selectNextBeacon } from "@/phenomenal/mplus/select-next";
import { findBeaconById } from "@/phenomenal/mplus/tree";
import type { QuizState } from "@/phenomenal/types/engine";

export function nextStep(state: QuizState): QuizState {
  const children = state.currentBeacon?.children ?? [];
  if (!children.length) return { ...state, finished: true };

  const nextId = selectNextBeacon(children, state.mode);
  const nextBeacon = nextId ? findBeaconById(nextId) : null;

  // Если nextId есть, но findBeaconById не нашёл узел — считаем поток завершённым,
  // чтобы не попасть в состояние { currentBeacon: null, finished: false }.
  return {
    ...state,
    currentBeacon: nextBeacon,
    finished: !nextBeacon,
  };
}
