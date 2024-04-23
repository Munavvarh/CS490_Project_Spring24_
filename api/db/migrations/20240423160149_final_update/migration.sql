-- DropForeignKey
ALTER TABLE `Error` DROP FOREIGN KEY `Error_translationId_fkey`;

-- DropForeignKey
ALTER TABLE `Feedback` DROP FOREIGN KEY `Feedback_translationId_fkey`;

-- AlterTable
ALTER TABLE `Error` MODIFY `translationId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Feedback` MODIFY `translationId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Feedback` ADD CONSTRAINT `Feedback_translationId_fkey` FOREIGN KEY (`translationId`) REFERENCES `TranslationHistory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Error` ADD CONSTRAINT `Error_translationId_fkey` FOREIGN KEY (`translationId`) REFERENCES `TranslationHistory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
