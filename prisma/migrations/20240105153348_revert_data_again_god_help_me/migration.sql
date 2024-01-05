/*
  Warnings:

  - The `data` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "data",
ADD COLUMN     "data" JSONB NOT NULL DEFAULT '{}';

-- CreateIndex
CREATE INDEX "User_data_idx" ON "User"("data");

-- CreateIndex
CREATE INDEX "User_data_email_idx" ON "User"("data", "email");

-- CreateIndex
CREATE INDEX "User_data_userName_idx" ON "User"("data", "userName");

-- CreateIndex
CREATE INDEX "User_data_email_userName_idx" ON "User"("data", "email", "userName");
