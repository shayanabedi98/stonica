/*
  Warnings:

  - Added the required column `color` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qty` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "height" TEXT,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "price" TEXT NOT NULL,
ADD COLUMN     "qty" INTEGER NOT NULL,
ADD COLUMN     "salePrice" TEXT,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "width" TEXT;
