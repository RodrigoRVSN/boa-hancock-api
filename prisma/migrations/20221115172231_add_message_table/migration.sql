-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_user_id_fkey";

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "to_user_id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Message_id_key" ON "Message"("id");

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
