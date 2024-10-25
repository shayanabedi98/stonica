/*
  Warnings:

  - You are about to drop the column `emails` on the `EmailSubscriber` table. All the data in the column will be lost.
  - Added the required column `email` to the `EmailSubscriber` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmailSubscriber" DROP COLUMN "emails",
ADD COLUMN     "email" TEXT NOT NULL;
