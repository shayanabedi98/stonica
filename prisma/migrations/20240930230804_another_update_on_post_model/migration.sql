/*
  Warnings:

  - Added the required column `bookmatched` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `veins` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `colors` on the `Post` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "bookmatched" TEXT NOT NULL,
ADD COLUMN     "veins" TEXT NOT NULL,
DROP COLUMN "colors",
ADD COLUMN     "colors" JSONB NOT NULL;
