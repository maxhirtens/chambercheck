/*
  Warnings:

  - You are about to alter the column `content` on the `Review` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(240)`.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_authorId_fkey";

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "content" SET DATA TYPE VARCHAR(240);

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
