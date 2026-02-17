"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function registerUser(formData: any) {
  const hashedPassword = await bcrypt.hash(formData.password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email: formData.email,
        passwordHash: hashedPassword,
        name: formData.name,
        cin: formData.cin,
        cne: formData.cne,
        apogeeCode: formData.apogeeCode,
        studentCard: formData.studentCardUrl, // From Vercel Blob
      },
    });
    return { success: true };
  } catch (error) {
    return { error: "L'utilisateur ou les codes académiques existent déjà." };
  }
}
