/*
  Warnings:

  - You are about to drop the column `codeInput` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `codeOutput` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserExample` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[translationId]` on the table `Feedback` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `translationId` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Feedback` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- AlterTable
ALTER TABLE `Feedback` DROP COLUMN `codeInput`,
    DROP COLUMN `codeOutput`,
    DROP COLUMN `email`,
    ADD COLUMN `translationId` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `TranslationHistory` MODIFY `originalCode` TEXT NOT NULL,
    MODIFY `translatedCode` TEXT NOT NULL;

-- DropTable
DROP TABLE `Post`;

-- DropTable
DROP TABLE `UserExample`;

-- CreateTable
CREATE TABLE `Error` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `translationId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Error_translationId_key`(`translationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Feedback_translationId_key` ON `Feedback`(`translationId`);

-- AddForeignKey
ALTER TABLE `Feedback` ADD CONSTRAINT `Feedback_translationId_fkey` FOREIGN KEY (`translationId`) REFERENCES `TranslationHistory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Feedback` ADD CONSTRAINT `Feedback_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Error` ADD CONSTRAINT `Error_translationId_fkey` FOREIGN KEY (`translationId`) REFERENCES `TranslationHistory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
