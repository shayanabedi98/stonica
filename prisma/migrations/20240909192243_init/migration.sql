/*
  Warnings:

  - You are about to drop the column `hashedPassword` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `isAdmin` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `resetToken` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `resetTokenExpiry` on the `Account` table. All the data in the column will be lost.
  - Added the required column `isAdmin` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "hashedPassword",
DROP COLUMN "isAdmin",
DROP COLUMN "resetToken",
DROP COLUMN "resetTokenExpiry";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hashedPassword" TEXT,
ADD COLUMN     "isAdmin" BOOLEAN NOT NULL,
ADD COLUMN     "resetToken" TEXT,
ADD COLUMN     "resetTokenExpiry" TIMESTAMP(3);
