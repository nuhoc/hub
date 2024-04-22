/*
  Warnings:

  - You are about to drop the column `name` on the `Membership` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Membership_name_idx";

-- AlterTable
ALTER TABLE "Membership" DROP COLUMN "name";
