/*
  Warnings:

  - Added the required column `sender_id` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "sender_id" TEXT NOT NULL;
