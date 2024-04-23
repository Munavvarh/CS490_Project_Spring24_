/*
  Warnings:

  - You are about to drop the column `twoFactorSecret` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `twoFactorSecret`,
    ADD COLUMN `tokenCreatedAt` DATETIME(3) NULL,
    ADD COLUMN `twoFactorToken` VARCHAR(191) NULL;
