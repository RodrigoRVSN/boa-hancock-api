/*
  Warnings:

  - Added the required column `user_id` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_user_id_fkey";

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "match_id" TEXT,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "Match"("id") ON DELETE SET NULL ON UPDATE CASCADE;
