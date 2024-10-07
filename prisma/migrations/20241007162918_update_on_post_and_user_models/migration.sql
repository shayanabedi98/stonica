/*
  Warnings:

  - The `colors` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "colors",
ADD COLUMN     "colors" TEXT[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "facebook" TEXT,
ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "website" TEXT;
