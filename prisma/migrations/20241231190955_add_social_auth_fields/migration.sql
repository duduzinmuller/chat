/*
  Warnings:

  - A unique constraint covering the columns `[googleId]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[facebookId]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authProvider` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('LOCAL', 'GOOGLE', 'FACEBOOK');

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "authProvider" "AuthProvider" NOT NULL,
ADD COLUMN     "facebookId" TEXT,
ADD COLUMN     "googleId" TEXT,
ALTER COLUMN "password" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Contact_googleId_key" ON "Contact"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_facebookId_key" ON "Contact"("facebookId");
