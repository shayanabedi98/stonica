/*
  Warnings:

  - You are about to drop the column `color` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "color",
ADD COLUMN     "colors" TEXT[];
