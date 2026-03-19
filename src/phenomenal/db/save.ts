import type { QuizFlow } from "@/phenomenal/types/flow";

const STORAGE_KEY = "phenomenal.quiz.flows";

export async function saveFlow(flow: QuizFlow) {
  if (typeof window === "undefined") {
    return Promise.resolve({ ok: false, reason: "server" });
  }

  const existing = getSavedFlows();
  const next = [flow, ...existing.filter((item) => item.id !== flow.id)];

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));

  return Promise.resolve({ ok: true, total: next.length });
}

export function getSavedFlows(): QuizFlow[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as QuizFlow[];
  } catch {
    return [];
  }
}
