-- DropForeignKey
ALTER TABLE `error` DROP FOREIGN KEY `Error_translationId_fkey`;

-- DropForeignKey
ALTER TABLE `feedback` DROP FOREIGN KEY `Feedback_translationId_fkey`;

-- AddForeignKey
ALTER TABLE `Feedback` ADD CONSTRAINT `Feedback_translationId_fkey` FOREIGN KEY (`translationId`) REFERENCES `TranslationHistory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Error` ADD CONSTRAINT `Error_translationId_fkey` FOREIGN KEY (`translationId`) REFERENCES `TranslationHistory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
