// lib/data-simulation.ts
import { reclamations } from "./placeholder-data";

// Helper to simulate network latency
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function fetchStudentReclamations(studentCne?: string) {
  console.log("Fetching student data...");
  await delay(1500); // Trigger our cool skeletons!

  // If we had real auth, we'd filter by the student's unique CNE
  return reclamations;
}

export async function fetchReclamationById(id: string) {
  console.log(`Fetching reclamation: ${id}`);
  await delay(1000);

  const found = reclamations.find((r) => r.id === id);

  // Logic to simulate a "Not Found" case for testing
  if (!found || id === "test-error") return null;

  return found;
}

export async function fetchDashboardStats() {
  await delay(800);
  return {
    total: reclamations.length,
    pending: reclamations.filter((r) => r.status === "PENDING").length,
    resolved: reclamations.filter((r) => r.status === "RESOLVED").length,
  };
}

export async function fetchLatestReclamation() {
  await delay(800); // Simulated "look-up" time

  if (reclamations.length === 0) return null;

  // Simulate finding the most recent one (assuming they are ordered or by picking the last)
  // In Prisma, this would be:
  // prisma.reclamation.findFirst({ orderBy: { createdAt: 'desc' }, where: { studentId } })
  const latest = reclamations[reclamations.length - 1];

  return latest;
}
