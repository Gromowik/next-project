'use server';

import { readSessionFromCookie } from "@/core/auth/session";
import { saveFlowForUser } from "@/core/db/flows";
import type { QuizFlow } from "@/phenomenal/types/flow";

export type SaveFlowActionResult =
  | { ok: true }
  | { ok: false; reason: "not_authenticated" | "db_error" };

/**
 * Server Action — выполняется на сервере, вызывается из Client Component напрямую.
 * Читает сессию из cookie, сохраняет flow в БД.
 * Не требует fetch() — Next.js сам организует вызов.
 */
export async function saveFlowAction(
  flow: QuizFlow,
  sequence: number,
): Promise<SaveFlowActionResult> {
  const session = await readSessionFromCookie();

  if (!session) {
    return { ok: false, reason: "not_authenticated" };
  }

  try {
    await saveFlowForUser({ userId: session.sub, flow, sequence });
    return { ok: true };
  } catch {
    return { ok: false, reason: "db_error" };
  }
}
