/*
  Warnings:

  - The `salePrice` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `price` on the `Post` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "price",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
DROP COLUMN "salePrice",
ADD COLUMN     "salePrice" DOUBLE PRECISION;
