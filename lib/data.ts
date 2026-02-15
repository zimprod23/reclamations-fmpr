// lib/data.ts
import { prisma } from "./prisma";

// Fetch all demands for the Admin table
export async function fetchAllDemands() {
  try {
    const demands = await prisma.reclamation.findMany({
      include: {
        student: { select: { name: true, email: true, apogeeCode: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return demands;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch demands.");
  }
}

// Fetch stats for the Admin Dashboard
export async function fetchDashboardStats() {
  const [total, pending, resolved] = await Promise.all([
    prisma.reclamation.count(),
    prisma.reclamation.count({ where: { status: "PENDING" } }),
    prisma.reclamation.count({ where: { status: "RESOLVED" } }),
  ]);

  return { total, pending, resolved };
}
