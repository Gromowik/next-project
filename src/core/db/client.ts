import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/core/db/schema";

type DbInstance = ReturnType<typeof drizzle<typeof schema>>;

const globalForDb = globalThis as unknown as {
  pgSqlClient?: ReturnType<typeof postgres>;
  drizzleDb?: DbInstance;
};

export function getDb(): DbInstance {
  if (globalForDb.drizzleDb) {
    return globalForDb.drizzleDb;
  }

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured. Copy values from .env.example first.");
  }

  const pgSqlClient =
    globalForDb.pgSqlClient ??
    postgres(connectionString, {
      max: 10,
      idle_timeout: 20,
      connect_timeout: 10,
    });

  const db = drizzle(pgSqlClient, { schema });

  if (process.env.NODE_ENV !== "production") {
    globalForDb.pgSqlClient = pgSqlClient;
    globalForDb.drizzleDb = db;
  }

  return db;
}
