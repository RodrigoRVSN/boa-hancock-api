/*
  Warnings:

  - A unique constraint covering the columns `[match_id]` on the table `Message` will be added. If there are existing duplicate values, this will fail.
  - Made the column `match_id` on table `Message` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_match_id_fkey";

-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "match_id" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Message_match_id_key" ON "Message"("match_id");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
