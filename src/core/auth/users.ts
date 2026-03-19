import { eq } from "drizzle-orm";
import { getDb } from "@/core/db/client";
import { users } from "@/core/db/schema";

export type DbUser = {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
};

export async function findUserByEmail(email: string): Promise<DbUser | null> {
  const db = getDb();
  const normalized = email.toLowerCase().trim();
  const [row] = await db.select().from(users).where(eq(users.email, normalized)).limit(1);
  return row ?? null;
}

export async function createUser(input: {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
}): Promise<DbUser> {
  const db = getDb();
  const normalizedEmail = input.email.toLowerCase().trim();
  const normalizedName = input.name.trim();

  const [created] = await db
    .insert(users)
    .values({
      id: input.id,
      email: normalizedEmail,
      name: normalizedName,
      passwordHash: input.passwordHash,
    })
    .returning();

  return created;
}
