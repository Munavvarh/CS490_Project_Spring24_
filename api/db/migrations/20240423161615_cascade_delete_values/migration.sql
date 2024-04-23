/*
  Warnings:

  - Made the column `translationId` on table `Error` required. This step will fail if there are existing NULL values in that column.
  - Made the column `translationId` on table `Feedback` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Contact` DROP FOREIGN KEY `Contact_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Error` DROP FOREIGN KEY `Error_translationId_fkey`;

-- DropForeignKey
ALTER TABLE `Feedback` DROP FOREIGN KEY `Feedback_translationId_fkey`;

-- DropForeignKey
ALTER TABLE `Feedback` DROP FOREIGN KEY `Feedback_userId_fkey`;

-- DropForeignKey
ALTER TABLE `TranslationHistory` DROP FOREIGN KEY `TranslationHistory_userId_fkey`;

-- AlterTable
ALTER TABLE `Error` MODIFY `translationId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Feedback` MODIFY `translationId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Feedback` ADD CONSTRAINT `Feedback_translationId_fkey` FOREIGN KEY (`translationId`) REFERENCES `TranslationHistory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Feedback` ADD CONSTRAINT `Feedback_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Error` ADD CONSTRAINT `Error_translationId_fkey` FOREIGN KEY (`translationId`) REFERENCES `TranslationHistory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TranslationHistory` ADD CONSTRAINT `TranslationHistory_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contact` ADD CONSTRAINT `Contact_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
