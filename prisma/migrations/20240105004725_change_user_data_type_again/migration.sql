/*
  Warnings:

  - Changed the type of `data` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "data",
ADD COLUMN     "data" JSONB NOT NULL;

-- CreateIndex
CREATE INDEX "User_data_idx" ON "User"("data");

-- CreateIndex
CREATE INDEX "User_data_email_idx" ON "User"("data", "email");

-- CreateIndex
CREATE INDEX "User_data_userName_idx" ON "User"("data", "userName");

-- CreateIndex
CREATE INDEX "User_data_email_userName_idx" ON "User"("data", "email", "userName");
