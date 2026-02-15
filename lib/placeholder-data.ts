export const users = [
  {
    id: "user_1",
    name: "Admin Principal",
    email: "admin@faculty.ma",
    role: "ADMIN",
  },
  {
    id: "user_2",
    name: "Amine El Amrani",
    email: "amine.amrani@etu.uae.ac.ma",
    role: "STUDENT",
    apogeeCode: "21004567",
    cin: "AB123456",
    cne: "P134567890",
    studentCardUrl: "https://example.com/cards/amine.pdf",
  },
  {
    id: "user_3",
    name: "Sara Mansouri",
    email: "sara.mansouri@etu.uae.ac.ma",
    role: "STUDENT",
    apogeeCode: "22008912",
    cin: "CD987654",
    cne: "G130987654",
    studentCardUrl: "https://example.com/cards/sara.pdf",
  },
];

export const reclamations = [
  {
    id: "rec_1",
    subject: "Correction de note - Analyse 1",
    description:
      "Ma note sur le portail est de 08/20 alors que j'ai eu 14/20 sur la copie.",
    status: "PENDING",
    adminResponse: null,
    studentId: "user_2",
    createdAt: "2026-02-10T10:00:00Z",
  },
  {
    id: "rec_2",
    subject: "Problème d'inscription pédagogique",
    description:
      "Impossible de s'inscrire au module de Thermodynamique via Apogée.",
    status: "IN_PROGRESS",
    adminResponse: "Nous vérifions votre dossier avec le service scolarité.",
    studentId: "user_3",
    adminId: "user_1",
    createdAt: "2026-02-12T14:30:00Z",
  },
  {
    id: "rec_3",
    subject: "Attestation de scolarité",
    description: "Demande urgente pour dossier de bourse.",
    status: "RESOLVED",
    adminResponse: "Votre attestation est disponible au guichet n°3.",
    studentId: "user_2",
    adminId: "user_1",
    createdAt: "2026-02-05T09:15:00Z",
  },
];
