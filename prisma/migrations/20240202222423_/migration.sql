/*
  Warnings:

  - You are about to drop the column `locationCity` on the `Review` table. All the data in the column will be lost.
  - Added the required column `locationAddress` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "locationCity",
ADD COLUMN     "clothTowels" BOOLEAN DEFAULT false,
ADD COLUMN     "femProducts" BOOLEAN DEFAULT false,
ADD COLUMN     "handDryer" BOOLEAN DEFAULT false,
ADD COLUMN     "locationAddress" TEXT NOT NULL;
