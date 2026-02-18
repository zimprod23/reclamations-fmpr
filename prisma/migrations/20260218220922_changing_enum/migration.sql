/*
  Warnings:

  - The values [INTERNSHIP,ADMINISTRATIVE] on the enum `ReclamationType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ReclamationType_new" AS ENUM ('MAIL_PWD', 'MAIL_PHONE', 'MAIL_ACTIVATE', 'BOURSE_MINHATY', 'BOURSE_TRANSFER', 'CERTIFICATE', 'EXAM_REVIEW', 'OTHER');
ALTER TABLE "public"."Reclamation" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Reclamation" ALTER COLUMN "type" TYPE "ReclamationType_new" USING ("type"::text::"ReclamationType_new");
ALTER TYPE "ReclamationType" RENAME TO "ReclamationType_old";
ALTER TYPE "ReclamationType_new" RENAME TO "ReclamationType";
DROP TYPE "public"."ReclamationType_old";
ALTER TABLE "Reclamation" ALTER COLUMN "type" SET DEFAULT 'OTHER';
COMMIT;

-- AlterTable
ALTER TABLE "Reclamation" ALTER COLUMN "type" SET DEFAULT 'OTHER';
