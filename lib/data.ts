// lib/data.ts
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
import { prisma } from "./prisma";
import {finalReclamationSchema} from "./validations"


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


export async function submitReclamation(data: z.infer<typeof finalReclamationSchema>, studentId: string) {
  try {
    // const studentId = await getStudentId(); // called per request

    return await prisma.Reclamation.create({
      data: {
        studentId,
        mainCategory: data.mainCategory,
        subIssue: data.subIssue ?? null,
        message: data.details.message ?? null,
        phone: data.details.phone ?? null,
      },
    });
  } catch (error: any) {
    console.error("Database Error:", error);
    throw new Error(error.message || "Impossible d'envoyer la réclamation");
  }
}
