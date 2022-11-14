-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_user_id_fkey";

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_matched_user_id_fkey" FOREIGN KEY ("matched_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
