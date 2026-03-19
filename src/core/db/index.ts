/**
 * Конфигурация базы данных
 * @module core/db
 */

import { env } from "@/core/env";

export { getDb } from "@/core/db/client";
export * from "@/core/db/schema";

export interface DatabaseConfig {
  url: string;
  maxConnections?: number;
}

// Пример для будущего использования с Prisma:
// import { PrismaClient } from '@prisma/client'
// 
// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined
// }
// 
// export const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     log: ['query'],
//   })
// 
// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export const dbConfig: DatabaseConfig = {
  url: env.DATABASE_URL || "",
  maxConnections: 10,
};
