/*
  Warnings:

  - You are about to drop the column `colors` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "colors",
ADD COLUMN     "baseColor" TEXT,
ADD COLUMN     "secondaryColor" TEXT,
ADD COLUMN     "veinColor" TEXT,
ALTER COLUMN "bookmatched" DROP NOT NULL;
