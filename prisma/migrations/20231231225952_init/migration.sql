-- CreateEnum
CREATE TYPE "State" AS ENUM ('NEW_HANOVER', 'AMBARINO', 'LEMOYNE', 'WEST_ELIZABETH', 'NEW_AUSTIN');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('ANIMAL', 'PLANT', 'LEGENDARY_ANIMAL');

-- CreateEnum
CREATE TYPE "SubCategory" AS ENUM ('DEFAULT', 'BIRD', 'FISH', 'CRITTER');

-- CreateTable
CREATE TABLE "BaseEntity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "subCategoryId" TEXT,
    "subCategory" "SubCategory",
    "comments" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BaseEntity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "locationDataId" TEXT NOT NULL,
    "comments" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocationData" (
    "id" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "name" TEXT,
    "state" "State" NOT NULL,
    "comments" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LocationData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "data" JSONB DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BaseEntityToLocation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "BaseEntity_name_key" ON "BaseEntity"("name");

-- CreateIndex
CREATE UNIQUE INDEX "LocationData_name_key" ON "LocationData"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_data_idx" ON "User"("data");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_name_idx" ON "User"("name");

-- CreateIndex
CREATE INDEX "User_data_email_idx" ON "User"("data", "email");

-- CreateIndex
CREATE INDEX "User_data_name_idx" ON "User"("data", "name");

-- CreateIndex
CREATE INDEX "User_email_name_idx" ON "User"("email", "name");

-- CreateIndex
CREATE INDEX "User_data_email_name_idx" ON "User"("data", "email", "name");

-- CreateIndex
CREATE UNIQUE INDEX "_BaseEntityToLocation_AB_unique" ON "_BaseEntityToLocation"("A", "B");

-- CreateIndex
CREATE INDEX "_BaseEntityToLocation_B_index" ON "_BaseEntityToLocation"("B");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_locationDataId_fkey" FOREIGN KEY ("locationDataId") REFERENCES "LocationData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BaseEntityToLocation" ADD CONSTRAINT "_BaseEntityToLocation_A_fkey" FOREIGN KEY ("A") REFERENCES "BaseEntity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BaseEntityToLocation" ADD CONSTRAINT "_BaseEntityToLocation_B_fkey" FOREIGN KEY ("B") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;
