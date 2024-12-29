-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "resetCode" TEXT,
ADD COLUMN     "resetCodeExpiration" TIMESTAMP(3);
