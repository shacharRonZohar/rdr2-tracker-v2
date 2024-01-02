/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `userName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_data_email_name_idx";

-- DropIndex
DROP INDEX "User_data_name_idx";

-- DropIndex
DROP INDEX "User_email_name_idx";

-- DropIndex
DROP INDEX "User_name_idx";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "userName" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "User_userName_idx" ON "User"("userName");

-- CreateIndex
CREATE INDEX "User_data_userName_idx" ON "User"("data", "userName");

-- CreateIndex
CREATE INDEX "User_email_userName_idx" ON "User"("email", "userName");

-- CreateIndex
CREATE INDEX "User_data_email_userName_idx" ON "User"("data", "email", "userName");
