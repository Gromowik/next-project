import { NextResponse } from "next/server";
import { readSessionFromCookie } from "@/core/auth/session";

export async function requireSessionUser() {
  const session = await readSessionFromCookie();
  if (!session) {
    return {
      ok: false as const,
      response: NextResponse.json({ message: "Nicht autorisiert" }, { status: 401 }),
    };
  }

  return {
    ok: true as const,
    session,
  };
}
