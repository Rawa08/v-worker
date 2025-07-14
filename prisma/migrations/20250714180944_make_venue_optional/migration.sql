/*
  Warnings:

  - A unique constraint covering the columns `[androidId]` on the table `Device` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_venueId_fkey";

-- AlterTable
ALTER TABLE "Device" ALTER COLUMN "venueId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Device_androidId_key" ON "Device"("androidId");

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE SET NULL ON UPDATE CASCADE;
