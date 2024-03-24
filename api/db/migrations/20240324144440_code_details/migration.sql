/*
  Warnings:

  - Added the required column `originalLanguage` to the `TranslationHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `translationLanguage` to the `TranslationHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `translationhistory`
ADD COLUMN `originalLanguage` VARCHAR(191) NOT NULL DEFAULT 'Unknown',
ADD COLUMN `translationLanguage` VARCHAR(191) NOT NULL DEFAULT 'Unknown';