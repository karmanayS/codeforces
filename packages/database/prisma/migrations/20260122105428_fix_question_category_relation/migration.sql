-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_categoryName_fkey";

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "Category"("title") ON DELETE RESTRICT ON UPDATE CASCADE;
