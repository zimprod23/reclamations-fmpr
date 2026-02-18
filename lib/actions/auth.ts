"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Mot de passe minimum 8 caractères"),
  name: z.string().min(2),
  cin: z.string().min(3),
  cne: z.string().min(3),
  apogeeCode: z.string().min(3),
});

export async function registerStudent(formData: any) {
  const parsed = registerSchema.safeParse(formData);

  if (!parsed.success) {
    return { error: "Données invalides." };
  }

  const { email, password, name, cin, cne, apogeeCode } = parsed.data;

  // Check duplicates explicitly
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email },
        { cin },
        { cne },
        { apogeeCode },
      ],
    },
  });

  if (existingUser) {
    return {
      error: "Un utilisateur avec ces informations existe déjà.",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

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
}
