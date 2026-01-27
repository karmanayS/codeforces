-- CreateTable
CREATE TABLE "Submission_token" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "submissionId" INTEGER NOT NULL,

    CONSTRAINT "Submission_token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Submission_token_token_key" ON "Submission_token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Submission_token_submissionId_key" ON "Submission_token"("submissionId");

-- AddForeignKey
ALTER TABLE "Submission_token" ADD CONSTRAINT "Submission_token_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
