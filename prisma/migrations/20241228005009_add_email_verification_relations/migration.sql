/*
  Warnings:

  - You are about to drop the column `email` on the `EmailVerification` table. All the data in the column will be lost.
  - Added the required column `contactId` to the `EmailVerification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EmailVerification" DROP CONSTRAINT "EmailVerification_email_fkey";

-- AlterTable
ALTER TABLE "EmailVerification" DROP COLUMN "email",
ADD COLUMN     "contactId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "EmailVerification" ADD CONSTRAINT "EmailVerification_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
