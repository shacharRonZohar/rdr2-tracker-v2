-- CreateEnum
CREATE TYPE "State" AS ENUM ('NEW_HANOVER', 'AMBARINO', 'LEMOYNE', 'WEST_ELIZABETH', 'NEW_AUSTIN');

-- CreateEnum
CREATE TYPE "AnimalType" AS ENUM ('DEFAULT', 'BIRD', 'FISH');

-- CreateTable
CREATE TABLE "Animal" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" "AnimalType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plant" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "locationId" TEXT,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LegendaryAnimal" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "legendaryAnimalLocationId" TEXT NOT NULL,

    CONSTRAINT "LegendaryAnimal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "state" "State" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "legendaryAnimalId" TEXT,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AnimalToLocation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AnimalToComment" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_LocationToPlant" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CommentToPlant" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Animal_name_key" ON "Animal"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Plant_name_key" ON "Plant"("name");

-- CreateIndex
CREATE UNIQUE INDEX "LegendaryAnimal_name_key" ON "LegendaryAnimal"("name");

-- CreateIndex
CREATE UNIQUE INDEX "LegendaryAnimal_locationId_key" ON "LegendaryAnimal"("locationId");

-- CreateIndex
CREATE UNIQUE INDEX "Location_name_key" ON "Location"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_legendaryAnimalId_key" ON "Comment"("legendaryAnimalId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_AnimalToLocation_AB_unique" ON "_AnimalToLocation"("A", "B");

-- CreateIndex
CREATE INDEX "_AnimalToLocation_B_index" ON "_AnimalToLocation"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AnimalToComment_AB_unique" ON "_AnimalToComment"("A", "B");

-- CreateIndex
CREATE INDEX "_AnimalToComment_B_index" ON "_AnimalToComment"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LocationToPlant_AB_unique" ON "_LocationToPlant"("A", "B");

-- CreateIndex
CREATE INDEX "_LocationToPlant_B_index" ON "_LocationToPlant"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CommentToPlant_AB_unique" ON "_CommentToPlant"("A", "B");

-- CreateIndex
CREATE INDEX "_CommentToPlant_B_index" ON "_CommentToPlant"("B");

-- AddForeignKey
ALTER TABLE "LegendaryAnimal" ADD CONSTRAINT "LegendaryAnimal_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_legendaryAnimalId_fkey" FOREIGN KEY ("legendaryAnimalId") REFERENCES "LegendaryAnimal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimalToLocation" ADD CONSTRAINT "_AnimalToLocation_A_fkey" FOREIGN KEY ("A") REFERENCES "Animal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimalToLocation" ADD CONSTRAINT "_AnimalToLocation_B_fkey" FOREIGN KEY ("B") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimalToComment" ADD CONSTRAINT "_AnimalToComment_A_fkey" FOREIGN KEY ("A") REFERENCES "Animal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimalToComment" ADD CONSTRAINT "_AnimalToComment_B_fkey" FOREIGN KEY ("B") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationToPlant" ADD CONSTRAINT "_LocationToPlant_A_fkey" FOREIGN KEY ("A") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationToPlant" ADD CONSTRAINT "_LocationToPlant_B_fkey" FOREIGN KEY ("B") REFERENCES "Plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommentToPlant" ADD CONSTRAINT "_CommentToPlant_A_fkey" FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommentToPlant" ADD CONSTRAINT "_CommentToPlant_B_fkey" FOREIGN KEY ("B") REFERENCES "Plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
