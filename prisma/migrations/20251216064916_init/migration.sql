/*
  Warnings:

  - A unique constraint covering the columns `[idempotencyId]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idempotencyId]` on the table `Follower` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[followerId,followingId]` on the table `Follower` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idempotencyId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idempotencyId]` on the table `Notification` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idempotencyId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idempotencyId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Comment_idempotencyId_key` ON `Comment`(`idempotencyId`);

-- CreateIndex
CREATE UNIQUE INDEX `Follower_idempotencyId_key` ON `Follower`(`idempotencyId`);

-- CreateIndex
CREATE UNIQUE INDEX `Follower_followerId_followingId_key` ON `Follower`(`followerId`, `followingId`);

-- CreateIndex
CREATE UNIQUE INDEX `Like_idempotencyId_key` ON `Like`(`idempotencyId`);

-- CreateIndex
CREATE UNIQUE INDEX `Notification_idempotencyId_key` ON `Notification`(`idempotencyId`);

-- CreateIndex
CREATE UNIQUE INDEX `Post_idempotencyId_key` ON `Post`(`idempotencyId`);

-- CreateIndex
CREATE UNIQUE INDEX `User_idempotencyId_key` ON `User`(`idempotencyId`);

-- RenameIndex
ALTER TABLE `follower` RENAME INDEX `Follower_followerId_fkey` TO `Follower_followerId_idx`;

-- RenameIndex
ALTER TABLE `follower` RENAME INDEX `Follower_followingId_fkey` TO `Follower_followingId_idx`;
