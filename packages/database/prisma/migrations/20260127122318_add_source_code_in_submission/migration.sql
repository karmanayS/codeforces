/*
  Warnings:

  - You are about to drop the column `token` on the `Submission` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[source_code]` on the table `Submission` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `source_code` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Submission_token_key";

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "token",
ADD COLUMN     "source_code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Submission_source_code_key" ON "Submission"("source_code");
