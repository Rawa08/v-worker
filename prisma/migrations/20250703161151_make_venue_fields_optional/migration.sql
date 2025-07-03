-- DropForeignKey
ALTER TABLE "Venue" DROP CONSTRAINT "Venue_contactPersonId_fkey";

-- AlterTable
ALTER TABLE "Venue" ALTER COLUMN "startDate" DROP NOT NULL,
ALTER COLUMN "contactPersonId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Venue" ADD CONSTRAINT "Venue_contactPersonId_fkey" FOREIGN KEY ("contactPersonId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
