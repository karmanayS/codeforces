/*
  Warnings:

  - Added the required column `token` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "token" TEXT NOT NULL;
