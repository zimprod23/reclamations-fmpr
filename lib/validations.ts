// lib/validation.ts
import { z } from "zod";


export const finalReclamationSchema = z.object({
  mainCategory: z.enum(["MAIL", "BOURSE", "AUTRE"]),
  subIssue: z.string().optional(),
  details: z.object({
    email: z.string().email().optional(),
    phone: z.string().optional(),
    message: z.string().optional(),
  }),
}).refine((data) => {
  if (data.mainCategory === "AUTRE") return data.details.message?.length >= 15;
  if (data.subIssue === "LOST_PHONE") return data.details.phone?.length >= 10;
  return true;
}, { message: "Validation échouée pour les champs requis." });

// export const reclamationSchema = z.object({
//   mainCategory: z.enum(["MAIL", "BOURSE", "AUTRE"], {
//     required_error: "Veuillez sélectionner une catégorie.",
//   }),
//   subIssue: z.string().optional(),
//   details: z.object({
//     email: z.string().email("Email institutionnel invalide").optional(),
//     phone: z.string().min(10, "Numéro de téléphone invalide").optional(),
//     message: z.string().min(15, "Description trop courte (min. 15 caractères)").optional(),
//   }),
// }).refine((data) => {
//   // AUTRE category requires message
//   if (data.mainCategory === "AUTRE") return !!data.details.message && data.details.message.length >= 15;
//   // LOST_PHONE requires phone
//   if (data.subIssue === "LOST_PHONE") return !!data.details.phone && data.details.phone.length >= 10;
//   // FORGOT_PWD or NO_ACCOUNT requires email
//   if (["FORGOT_PWD", "NO_ACCOUNT"].includes(data.subIssue || "")) return !!data.details.email;
//   return true; // other cases pass
// }, {
//   message: "Certains champs requis ne sont pas remplis correctement.",
// });

// Step 1: pick mainCategory
export const step1Schema = z.object({
  mainCategory: z.enum(["MAIL", "BOURSE", "AUTRE"], { required_error: "Veuillez sélectionner une catégorie." }),
});

// Step 2: pick subIssue
export const step2Schema = z.object({
  subIssue: z.string().nonempty("Veuillez préciser le problème."),
});

// Step 3: final details
export const step3Schema = z.object({
  details: z.object({
    email: z.string().email("Email institutionnel invalide").optional(),
    phone: z.string().min(10, "Numéro de téléphone invalide").optional(),
    message: z.string().min(15, "Description trop courte (min. 15 caractères)").optional(),
  }),
});

// export const reclamationSchema = z.object({
//   mainCategory: z.enum(["MAIL", "BOURSE", "AUTRE"], {
//     required_error: "Veuillez sélectionner une catégorie.",
//   }),
//   subIssue: z.string().optional(),
//   details: z.object({
//     email: z.string().email("Email institutionnel invalide").optional(),
//     phone: z
//       .string()
//       .min(10, "Numéro de téléphone invalide")
//       .optional(),
//     message: z
//       .string()
//       .min(15, "Description trop courte (min. 15 caractères)")
//       .optional(),
//   }),
// }).refine((data) => {
//   // Conditional checks
//   if (data.mainCategory === "AUTRE") return data.details.message && data.details.message.length >= 15;
//   if (data.subIssue === "LOST_PHONE") return data.details.phone && data.details.phone.length >= 10;
//   return true;
// }, {
//   message: "Validation échouée pour les champs requis.",
// });
