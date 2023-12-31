-- DropForeignKey
ALTER TABLE "LegendaryAnimal" DROP CONSTRAINT "LegendaryAnimal_locationId_fkey";

-- AlterTable
ALTER TABLE "LegendaryAnimal" ALTER COLUMN "locationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "LegendaryAnimal" ADD CONSTRAINT "LegendaryAnimal_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
