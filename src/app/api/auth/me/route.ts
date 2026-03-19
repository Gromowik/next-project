import { NextResponse } from "next/server";
import { readSessionFromCookie } from "@/core/auth";

export async function GET() {
  const session = await readSessionFromCookie();

  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({
    user: {
      id: session.sub,
      email: session.email,
      name: session.name,
    },
  });
}
