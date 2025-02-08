/*
  Warnings:

  - You are about to drop the column `femProducts` on the `Review` table. All the data in the column will be lost.
  - Added the required column `placeId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BathroomType" AS ENUM ('SHARED', 'MENS', 'WOMENS', 'FAMILY');

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "femProducts",
ADD COLUMN     "notClean" BOOLEAN DEFAULT false,
ADD COLUMN     "placeId" TEXT NOT NULL,
ADD COLUMN     "type" "BathroomType" NOT NULL DEFAULT 'SHARED';
