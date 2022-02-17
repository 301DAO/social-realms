/*
  Warnings:

  - You are about to drop the column `transaction_hash` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[follower_address,followee_address]` on the table `followers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[hash,liked_by]` on the table `likes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[public_address]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nonce]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hash` to the `likes` table without a default value. This is not possible if the table is not empty.

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
ALTER TABLE "likes" DROP COLUMN "transaction_hash",
ADD COLUMN     "hash" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "updated_at",
ADD COLUMN     "last_login" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "followers_follower_address_followee_address_key" ON "followers"("follower_address", "followee_address");

-- CreateIndex
CREATE UNIQUE INDEX "likes_hash_liked_by_key" ON "likes"("hash", "liked_by");

-- CreateIndex
CREATE UNIQUE INDEX "users_public_address_key" ON "users"("public_address");

-- CreateIndex
CREATE UNIQUE INDEX "users_nonce_key" ON "users"("nonce");
