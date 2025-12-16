import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

// Singleton para evitar múltiplas conexões em dev
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query", "warn", "error"], // opcional
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
