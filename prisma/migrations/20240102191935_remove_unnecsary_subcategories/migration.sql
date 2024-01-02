/*
  Warnings:

  - The values [BIRD,FISH] on the enum `SubCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SubCategory_new" AS ENUM ('DEFAULT', 'CRITTER');
ALTER TABLE "BaseEntity" ALTER COLUMN "subCategory" DROP DEFAULT;
ALTER TABLE "BaseEntity" ALTER COLUMN "subCategory" TYPE "SubCategory_new" USING ("subCategory"::text::"SubCategory_new");
ALTER TYPE "SubCategory" RENAME TO "SubCategory_old";
ALTER TYPE "SubCategory_new" RENAME TO "SubCategory";
DROP TYPE "SubCategory_old";
ALTER TABLE "BaseEntity" ALTER COLUMN "subCategory" SET DEFAULT 'DEFAULT';
COMMIT;
