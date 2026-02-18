"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function registerStudent(formData: any) {
  const { email, password, name, cin, cne, apogeeCode } = formData;

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return { error: "Cet email est déjà utilisé." };

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    await prisma.user.create({
      data: {
        email,
        name,
        passwordHash: hashedPassword,
        cin,
        cne,
        apogeeCode,
        role: "STUDENT",
      },
    });
    return { success: true };
  } catch (error) {
    return {
      error:
        "Erreur lors de la création du compte. Vérifiez vos codes (CIN/CNE/Apogée).",
    };
  }
}
