"use server"; // Critical: tells Next.js this code only runs on the server

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { finalReclamationSchema } from "../validations";
import { ReclamationType } from "@prisma/client";

export async function updateReclamationStatus(
  id: string,
  status: any,
  response: string,
) {
  await prisma.reclamation.update({
    where: { id },
    data: {
      status,
      adminResponse: response,
      updatedAt: new Date(),
    },
  });

  // This clears the cache so the admin sees the updated list immediately
  revalidatePath("/admin/manage");
  revalidatePath(`/demands/${id}`);
}

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
        description: details.message || `Demande: ${subIssue || mainCategory}`,
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
