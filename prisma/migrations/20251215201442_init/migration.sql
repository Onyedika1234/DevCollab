/*
  Warnings:

  - A unique constraint covering the columns `[followerId,followingId]` on the table `Follower` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idempotencyId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idempotencyId` to the `Follower` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idempotencyId` to the `Like` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idempotencyId` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idempotencyId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idempotencyId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comment` ADD COLUMN `idempotencyId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `follower` ADD COLUMN `idempotencyId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `like` ADD COLUMN `idempotencyId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `notification` ADD COLUMN `idempotencyId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `post` ADD COLUMN `idempotencyId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `idempotencyId` VARCHAR(191) NOT NULL;

-- -- CreateIndex
-- CREATE UNIQUE INDEX `Follower_followerId_followingId_key` ON `Follower`(`followerId`, `followingId`);

-- -- RenameIndex
-- ALTER TABLE `follower` RENAME INDEX `Follower_followerId_fkey` TO `Follower_followerId_idx`;

-- RenameIndex
-- ALTER TABLE `follower` RENAME INDEX `Follower_followingId_fkey` TO `Follower_followingId_idx`;
