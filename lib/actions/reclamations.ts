"use server"; // Critical: tells Next.js this code only runs on the server

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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
