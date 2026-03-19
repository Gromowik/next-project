import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/core/auth";

export async function POST() {
  await clearSessionCookie();
  return NextResponse.json({ ok: true });
}
