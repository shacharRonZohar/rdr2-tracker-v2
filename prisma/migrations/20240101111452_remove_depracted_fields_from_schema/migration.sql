/*
  Warnings:

  - You are about to drop the column `categoryId` on the `BaseEntity` table. All the data in the column will be lost.
  - You are about to drop the column `subCategoryId` on the `BaseEntity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BaseEntity" DROP COLUMN "categoryId",
DROP COLUMN "subCategoryId";
