import { projectTree, findProjectBeaconById } from "@/phenomenal/project/project-tree";
import type { QuizState } from "@/phenomenal/types/engine";

/**
 * Запускает квиз о проекте — создаёт QuizState с корнем project-tree.
 * Аналог startQuiz() но привязан к proj-root, а не mplus-root.
 */
export function startProjectQuiz(): QuizState {
  return {
    currentBeacon: findProjectBeaconById("proj-root"),
    steps: [],
    finished: false,
    mode: "weighted",
  };
}

/**
 * Weighted pick из массива ID дочерних узлов projectTree.
 * Узлы с меньшей частотой посещений получают больший вес.
 */
function pickNextFromProject(ids: string[]): string | null {
  if (!ids.length) return null;

  const weighted = ids.map((id) => {
    const beacon = findProjectBeaconById(id);
    // Чем реже посещался — тем больше вес (1 / (f + 1))
    const weight = beacon ? Math.max(1, beacon.importance) / (beacon.f + 1) : 1;
    return { id, weight };
  });

  const total = weighted.reduce((sum, item) => sum + item.weight, 0);
  let cursor = Math.random() * total;

  for (const item of weighted) {
    cursor -= item.weight;
    if (cursor <= 0) return item.id;
  }

  return weighted[0]?.id ?? null;
}

/**
 * Переход к следующему узлу project-tree.
 * Аналог nextStep() но использует findProjectBeaconById.
 */
export function nextProjectStep(state: QuizState): QuizState {
  const children = state.currentBeacon?.children ?? [];
  if (!children.length) return { ...state, finished: true };

  const nextId = pickNextFromProject(children);
  const nextBeacon = nextId ? findProjectBeaconById(nextId) : null;

  return {
    ...state,
    currentBeacon: nextBeacon,
    finished: !nextBeacon,
  };
}

/**
 * Обновляет счётчик f у beacon в projectTree (in-memory).
 * Аналог updateBeaconFrequency() из mplus.
 */
export function updateProjectBeaconFrequency(id: string) {
  const beacon = projectTree.find((b) => b.id === id);
  if (beacon) beacon.f += 1;
}
