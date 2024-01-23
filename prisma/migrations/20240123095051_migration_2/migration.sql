/*
  Warnings:

  - Made the column `book_id` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Order` MODIFY `book_id` VARCHAR(191) NOT NULL;
