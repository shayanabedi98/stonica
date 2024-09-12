/*
  Warnings:

  - You are about to drop the column `companyLogo` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "companyLogo",
ADD COLUMN     "aptNum" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "stateProvince" TEXT,
ADD COLUMN     "street" TEXT,
ADD COLUMN     "zipPostalCode" TEXT;
