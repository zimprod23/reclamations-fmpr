"use server"; // Critical: tells Next.js this code only runs on the server

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { finalReclamationSchema } from "../validations";
import { ReclamationType, Status } from "@prisma/client";

// export async function updateReclamationStatus(
//   id: string,
//   status: any,
//   response: string,
// ) {
//   await prisma.reclamation.update({
//     where: { id },
//     data: {
//       status,
//       adminResponse: response,
//       updatedAt: new Date(),
//     },
//   });

//   // This clears the cache so the admin sees the updated list immediately
//   revalidatePath("/admin/manage");
//   revalidatePath(`/demands/${id}`);
// }

export async function submitReclamationAction(
  values: any,
  studentId: string | undefined,
) {
  if (!studentId) return { error: "Non autorisé. Veuillez vous reconnecter." };

  // 1. Validate the full data on the server
  const validatedFields = finalReclamationSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Données invalides. Veuillez vérifier le formulaire." };
  }

  const { mainCategory, subIssue, details } = validatedFields.data;

  try {
    // 2. Map to Enum
    let finalType: ReclamationType = "OTHER";
    if (mainCategory === "MAIL") {
      if (subIssue === "FORGOT_PWD") finalType = "MAIL_PWD";
      else if (subIssue === "LOST_PHONE") finalType = "MAIL_PHONE";
      else finalType = "MAIL_ACTIVATE";
    } else if (mainCategory === "BOURSE") {
      finalType = "BOURSE_MINHATY";
    }

    // 3. Create Record
    await prisma.reclamation.create({
      data: {
        studentId,
        type: finalType as ReclamationType,
        description: `${details.message || `Demande: ${subIssue || mainCategory}`}${details.email ? `\nEmail: ${details.email}` : ""}`,
        phone: details.phone || null,
        status: "PENDING",
        subject: subIssue || mainCategory || "Nouvelle Demande",
      },
    });

    revalidatePath("/student/dashboard");
    return { success: true };
  } catch (error) {
    return {
      error: "Erreur lors de la communication avec la base de données.",
    };
  }
}

export async function deleteReclamationAction(id: string, studentId: string) {
  try {
    const reclamation = await prisma.reclamation.findUnique({
      where: { id, studentId },
    });

    if (!reclamation) throw new Error("Demande non trouvée.");

    // Guard: Only allow deletion if status is PENDING
    if (reclamation.status !== "PENDING") {
      throw new Error("Impossible de supprimer une demande déjà traitée.");
    }

    await prisma.reclamation.delete({
      where: { id },
    });

    revalidatePath("/student/reclamations");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function updateReclamationStatus(id: string, formData: FormData) {
  // Extract values directly from formData
  const response = formData.get("response") as string;
  const action = formData.get("action") as string;

  let newStatus: Status;
  if (action === "REJECT") {
    newStatus = Status.REJECTED;
  } else {
    newStatus = Status.RESOLVED;
  }

  try {
    await prisma.reclamation.update({
      where: { id },
      data: {
        adminResponse: response,
        status: newStatus,
        updatedAt: new Date(),
      },
    });

    revalidatePath(`/admin/manage/${id}`);
    revalidatePath("/admin/manage");

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to update." };
  }
}

export async function flushReclamations() {
  await prisma.reclamation.deleteMany({});
  revalidatePath("/admin/dashboard");
}

// 2. Archive handled (RESOLVED/REJECTED) demands
export async function archiveHandledDemands() {
  const handled = await prisma.reclamation.findMany({
    where: {
      status: { in: ["RESOLVED", "REJECTED"] },
      archivedAt: null,
    },
  });

  if (handled.length === 0) return { message: "Rien à archiver" };

  await prisma.reclamation.updateMany({
    where: { id: { in: handled.map((h) => h.id) } },
    data: { archivedAt: new Date() },
  });

  revalidatePath("/admin/dashboard");
  return { message: `${handled.length} demandes archivées` };
}
