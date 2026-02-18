import { z } from "zod";

// Base category enum
const MainCategoryEnum = z.enum(["MAIL", "BOURSE", "AUTRE"]);

// Step 1: Just the category
export const step1Schema = z.object({
  mainCategory: MainCategoryEnum,
});

// Step 2: The sub-issue (required if not 'AUTRE')
export const step2Schema = z.object({
  subIssue: z.string().min(1, "Veuillez préciser la nature du problème."),
});

// The Final Complete Schema
export const finalReclamationSchema = z
  .object({
    mainCategory: MainCategoryEnum,
    subIssue: z.string().optional(),
    details: z.object({
      email: z
        .string()
        .email("Email institutionnel invalide")
        .optional()
        .or(z.literal("")),
      phone: z
        .string()
        .min(10, "Numéro de téléphone invalide")
        .optional()
        .or(z.literal("")),
      message: z
        .string()
        .min(15, "Veuillez fournir plus de détails (min. 15 caractères)")
        .optional()
        .or(z.literal("")),
    }),
  })
  .refine(
    (data) => {
      // Logic: If MAIL/FORGOT_PWD or MAIL/NO_ACCOUNT -> Email is required
      if (
        data.mainCategory === "MAIL" &&
        (data.subIssue === "FORGOT_PWD" || data.subIssue === "NO_ACCOUNT")
      ) {
        return !!data.details.email && data.details.email.length > 5;
      }
      // Logic: If LOST_PHONE -> Phone is required
      if (data.subIssue === "LOST_PHONE") {
        return !!data.details.phone && data.details.phone.length >= 10;
      }
      // Logic: If AUTRE -> Message is required
      if (data.mainCategory === "AUTRE") {
        return !!data.details.message && data.details.message.length >= 15;
      }
      return true;
    },
    {
      message:
        "Veuillez remplir les champs obligatoires pour ce type de demande.",
      path: ["details"], // Highlighting the details section in errors
    },
  );
