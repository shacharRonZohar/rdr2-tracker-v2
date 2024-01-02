/*
  Warnings:

  - Made the column `subCategory` on table `BaseEntity` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "BaseEntity" ALTER COLUMN "subCategory" SET NOT NULL,
ALTER COLUMN "subCategory" SET DEFAULT 'DEFAULT';
