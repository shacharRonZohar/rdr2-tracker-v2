/*
  Warnings:

  - You are about to drop the column `legendaryAnimalLocationId` on the `LegendaryAnimal` table. All the data in the column will be lost.
  - Added the required column `region` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Comment_legendaryAnimalId_key";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "locationDescriptionId" TEXT;

-- AlterTable
ALTER TABLE "LegendaryAnimal" DROP COLUMN "legendaryAnimalLocationId";

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "region" TEXT NOT NULL,
ALTER COLUMN "name" DROP NOT NULL;

-- CreateTable
CREATE TABLE "LocationDescription" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "locationId" TEXT NOT NULL,
    "relatedEntities" JSONB[],

    CONSTRAINT "LocationDescription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CommentToLocation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CommentToLocation_AB_unique" ON "_CommentToLocation"("A", "B");

-- CreateIndex
CREATE INDEX "_CommentToLocation_B_index" ON "_CommentToLocation"("B");

-- AddForeignKey
ALTER TABLE "LocationDescription" ADD CONSTRAINT "LocationDescription_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_locationDescriptionId_fkey" FOREIGN KEY ("locationDescriptionId") REFERENCES "LocationDescription"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommentToLocation" ADD CONSTRAINT "_CommentToLocation_A_fkey" FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommentToLocation" ADD CONSTRAINT "_CommentToLocation_B_fkey" FOREIGN KEY ("B") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;
