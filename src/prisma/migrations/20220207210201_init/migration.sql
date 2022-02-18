/*
  Warnings:

  - A unique constraint covering the columns `[follower_address,followee_address]` on the table `followers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[transaction_hash,liked_by]` on the table `likes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[public_address]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nonce]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "followers_follower_address_followee_address_key";

-- DropIndex
DROP INDEX "likes_transaction_hash_liked_by_key";

-- DropIndex
DROP INDEX "users_nonce_key";

-- DropIndex
DROP INDEX "users_public_address_key";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "nonce" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "followers_follower_address_followee_address_key" ON "followers"("follower_address", "followee_address");

-- CreateIndex
CREATE UNIQUE INDEX "likes_transaction_hash_liked_by_key" ON "likes"("transaction_hash", "liked_by");

-- CreateIndex
CREATE UNIQUE INDEX "users_public_address_key" ON "users"("public_address");

-- CreateIndex
CREATE UNIQUE INDEX "users_nonce_key" ON "users"("nonce");
