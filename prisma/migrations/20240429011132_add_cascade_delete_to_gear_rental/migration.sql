-- DropForeignKey
ALTER TABLE "GearOnRental" DROP CONSTRAINT "GearOnRental_rentalId_fkey";

-- AddForeignKey
ALTER TABLE "GearOnRental" ADD CONSTRAINT "GearOnRental_rentalId_fkey" FOREIGN KEY ("rentalId") REFERENCES "Rental"("id") ON DELETE CASCADE ON UPDATE CASCADE;
