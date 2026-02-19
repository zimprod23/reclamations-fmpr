// lib/data.ts
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
import { ReclamationType, Status } from "@prisma/client";
import { prisma } from "./prisma";
import { unstable_noStore as noStore } from "next/cache";
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

//analytics data

export async function getAdminAnalytics() {
  try {
    const now = new Date();
    const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    const [
      totalCount,
      pendingCount,
      resolvedCount,
      currentMonthCount,
      lastMonthCount, // Unified naming
      typeGroup,
      weeklyInflow,
    ] = await Promise.all([
      prisma.reclamation.count(),
      prisma.reclamation.count({ where: { status: Status.PENDING } }),
      prisma.reclamation.count({ where: { status: Status.RESOLVED } }),
      prisma.reclamation.count({
        where: { createdAt: { gte: startOfCurrentMonth } },
      }),
      prisma.reclamation.count({
        where: { createdAt: { gte: startOfLastMonth, lte: endOfLastMonth } },
      }),
      prisma.reclamation.groupBy({ by: ["type"], _count: { _all: true } }),
      prisma.reclamation.findMany({
        where: {
          createdAt: { gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) },
        },
        select: { createdAt: true },
        orderBy: { createdAt: "asc" },
      }),
    ]);

    const calculateTrend = (curr: number, prev: number) => {
      if (prev === 0) return curr > 0 ? 100 : 0;
      return Math.round(((curr - prev) / prev) * 100);
    };

    const getColor = (type: ReclamationType) => {
      const mapping: Record<ReclamationType, string> = {
        [ReclamationType.MAIL_PWD]: "bg-blue-500",
        [ReclamationType.MAIL_PHONE]: "bg-cyan-500",
        [ReclamationType.MAIL_ACTIVATE]: "bg-indigo-500",
        [ReclamationType.BOURSE_MINHATY]: "bg-emerald-500",
        [ReclamationType.BOURSE_TRANSFER]: "bg-teal-500",
        [ReclamationType.CERTIFICATE]: "bg-purple-500",
        [ReclamationType.EXAM_REVIEW]: "bg-amber-500",
        [ReclamationType.OTHER]: "bg-slate-400",
      };
      return mapping[type] || "bg-gray-500";
    };

    const categoryData = typeGroup.map((g) => ({
      label: g.type.replace(/_/g, " "),
      value:
        totalCount > 0 ? Math.round((g._count._all / totalCount) * 100) : 0,
      color: getColor(g.type),
    }));

    return {
      stats: {
        total: totalCount,
        pending: pendingCount,
        resolved: resolvedCount,
        totalTrend: calculateTrend(currentMonthCount, lastMonthCount), // Fixed variable name
      },
      categoryData,
      weeklyInflow, // Keeping this name
    };
  } catch (error) {
    console.error("Analytics Error:", error);
    throw new Error("Failed to fetch dashboard data.");
  }
}

export async function getFilteredReclamations(query: string, page: number = 1) {
  noStore(); // Ensure this data is always fresh and not cached
  const itemsPerPage = 6;
  const skip = (page - 1) * itemsPerPage;

  try {
    const where = {
      OR: [
        {
          student: { name: { contains: query, mode: "insensitive" as const } },
        },
        { student: { cne: { contains: query, mode: "insensitive" as const } } },
        {
          student: {
            apogeeCode: { contains: query, mode: "insensitive" as const },
          },
        },
        { subject: { contains: query, mode: "insensitive" as const } },
      ],
    };

    const [totalCount, reclamations] = await Promise.all([
      prisma.reclamation.count({ where }),
      prisma.reclamation.findMany({
        where,
        include: {
          student: {
            select: { name: true, cne: true, apogeeCode: true },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: itemsPerPage,
      }),
    ]);

    return {
      reclamations,
      totalPages: Math.ceil(totalCount / itemsPerPage),
      totalCount,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch reclamations.");
  }
}

// lib/data.ts
export async function getReclamationByIdForAdmin(id: string) {
  try {
    const reclamation = await prisma.reclamation.findUnique({
      where: { id },
      include: {
        student: {
          include: {
            _count: {
              select: { demands: true }, // Gets the total number of reclamations
            },
            demands: {
              orderBy: { createdAt: "desc" },
              take: 5, // Just show the last 5 for the sidebar
            },
          },
        },
        attachments: true,
      },
    });
    return reclamation;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch reclamation details.");
  }
}
