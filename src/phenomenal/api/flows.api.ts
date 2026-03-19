import type { QuizFlow } from "@/phenomenal/types/flow";

export type FlowsListResult =
  | { ok: true; flows: QuizFlow[] }
  | { ok: false; status: number };

export type FlowSaveResult =
  | { ok: true }
  | { ok: false; status: number };

export const flowsApi = {
  async list(): Promise<FlowsListResult> {
    try {
      const res = await fetch("/api/flows");
      if (!res.ok) return { ok: false, status: res.status };
      const data = (await res.json()) as { flows: QuizFlow[] };
      return { ok: true, flows: data.flows };
    } catch {
      return { ok: false, status: 0 };
    }
  },

  async save(flow: QuizFlow, sequence: number): Promise<FlowSaveResult> {
    try {
      const res = await fetch("/api/flows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ flow, sequence }),
      });
      if (!res.ok) return { ok: false, status: res.status };
      return { ok: true };
    } catch {
      return { ok: false, status: 0 };
    }
  },
};
