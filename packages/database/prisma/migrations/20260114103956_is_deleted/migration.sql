-- DropForeignKey
ALTER TABLE "TestCase" DROP CONSTRAINT "TestCase_questionId_fkey";

-- DropForeignKey
ALTER TABLE "VisibleTest" DROP CONSTRAINT "VisibleTest_questionId_fkey";

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "TestCase" ADD CONSTRAINT "TestCase_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisibleTest" ADD CONSTRAINT "VisibleTest_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
