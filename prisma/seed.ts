import { faker } from "@faker-js/faker";
import { PrismaClient, Role, Status } from "../lib/generated/prisma/client";

const prisma = new PrismaClient({ accelerateUrl: "", log: [] });

async function main() {
  console.log("🌱 Seeding database...");

  // 1. Create a placeholder Admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@faculty.ma" },
    update: {},
    create: {
      email: "admin@faculty.ma",
      name: "Admin Responsible",
      role: Role.ADMIN,
    },
  });

  // 2. Create 5 Placeholder Students
  for (let i = 0; i < 5; i++) {
    const student = await prisma.user.upsert({
      where: { email: faker.internet.email().toLowerCase() },
      update: {},
      create: {
        email: faker.internet.email().toLowerCase(),
        name: faker.person.fullName(),
        role: Role.STUDENT,
        apogeeCode: faker.string.numeric(8), // Moroccan Apogee style
        cin: faker.string.alphanumeric(8).toUpperCase(),
        cne: faker.string.alphanumeric(10).toUpperCase(),
        studentCard: "https://placehold.co/400x600?text=Carte+Etudiant",
      },
    });

    // 3. Create 1-2 Reclamations for each student
    await prisma.reclamation.create({
      data: {
        subject: faker.helpers.arrayElement([
          "Note manquante - Examen Automne",
          "Erreur sur le relevé de notes",
          "Changement de filière",
          "Problème d'inscription pédagogique",
        ]),
        description: faker.lorem.paragraph(),
        status: faker.helpers.arrayElement([Status.PENDING, Status.RESOLVED]),
        studentId: student.id,
        // If resolved, add a dummy admin response
        adminResponse:
          Math.random() > 0.5
            ? "Votre demande a été traitée par le service scolarité."
            : null,
        adminId: admin.id,
      },
    });
  }

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
