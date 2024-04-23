-- CreateTable
CREATE TABLE `SMTPSettings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `host` VARCHAR(191) NOT NULL,
    `port` INTEGER NOT NULL,
    `user` VARCHAR(191) NOT NULL,
    `pass` VARCHAR(191) NOT NULL,
    `secure` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
