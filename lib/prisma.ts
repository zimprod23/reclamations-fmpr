import { PrismaClient } from "@prisma/client";

// lib/prisma.ts
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    accelerateUrl: process.env.PRISMA_DATABASE_URL,
    log: ["query"], // Useful for debugging: see SQL in your terminal
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
