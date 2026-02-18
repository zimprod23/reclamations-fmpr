// lib/data.ts
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
import { prisma } from "./prisma";
import { finalReclamationSchema } from "./validations";
import { z } from "zod";

// let cachedStudentId: string | null = null;

// async function getStudentId() {
//   if (cachedStudentId) return cachedStudentId;

//   const session = await getServerSession(authOptions);
//   const studentId = (session as any)?.user?.id;

//   if (!studentId) throw new Error("Utilisateur non connecté");
//   cachedStudentId = studentId;
//   return studentId;
// }

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

export async function fetchStudentInfo(studentId: string) {
  try {
    const student = await prisma.user.findUnique({
      where: { id: studentId },
      select: {
        name: true,
        email: true,
        cin: true,
        cne: true,
        apogeeCode: true,
      },
    });

    if (!student) throw new Error("Étudiant non trouvé");

    return student;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Impossible de récupérer les informations de l'étudiant.");
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

export async function fetchLatestReclamation(studentId: string) {
  try {
    const latest = await prisma.reclamation.findFirst({
      where: { studentId },
      orderBy: { createdAt: "desc" },
    });

    console.log("Latest Reclamation:", latest);

    return latest;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the latest reclamation.");
  }
}

export async function getStudentReclamations(studentId: string) {
  try {
    const reclamations = await prisma.reclamation.findMany({
      where: {
        studentId: studentId,
      },
      orderBy: {
        id: "desc", // Shows newest first
      },
    });
    return reclamations;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch reclamations.");
  }
}

export async function getReclamationById(id: string, studentId: string) {
  try {
    const reclamation = await prisma.reclamation.findUnique({
      where: {
        id: id,
        studentId: studentId, // Security check!
      },
    });
    return reclamation;
  } catch (error) {
    console.error("Database Error:", error);
    return null;
  }
}
