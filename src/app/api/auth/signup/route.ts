import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { createSessionToken, hashPassword, setSessionCookie } from "@/core/auth";
import { createUser, findUserByEmail } from "@/core/auth/users";

const signupSchema = z.object({
  email: z.string().email(),
  name: z.string().trim().min(2).max(80),
  password: z.string().min(8).max(128),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = signupSchema.safeParse(body);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    const field = String(firstError?.path?.[0] ?? "Eingabe");
    const msg = firstError?.message ?? "Ungultige Eingabe";
    return NextResponse.json({ message: `${field}: ${msg}` }, { status: 400 });
  }

  const existing = await findUserByEmail(parsed.data.email);
  if (existing) {
    return NextResponse.json({ message: "E-Mail ist bereits registriert" }, { status: 409 });
  }

  const passwordHash = await hashPassword(parsed.data.password);
  const user = await createUser({
    id: randomUUID(),
    email: parsed.data.email,
    name: parsed.data.name,
    passwordHash,
  });

  const token = await createSessionToken({
    sub: user.id,
    email: user.email,
    name: user.name,
  });

  await setSessionCookie(token);

  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      token,
    },
    token,
  });
}
