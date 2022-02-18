-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "public_address" TEXT NOT NULL,
    "nonce" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "followers" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "followee_address" TEXT NOT NULL,
    "follower_address" TEXT NOT NULL,

    CONSTRAINT "followers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likes" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "transaction_hash" TEXT NOT NULL,
    "liked_by" TEXT NOT NULL,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_public_address_key" ON "users"("public_address");

-- CreateIndex
CREATE UNIQUE INDEX "users_nonce_key" ON "users"("nonce");

-- CreateIndex
CREATE UNIQUE INDEX "followers_follower_address_followee_address_key" ON "followers"("follower_address", "followee_address");

-- CreateIndex
CREATE UNIQUE INDEX "likes_transaction_hash_liked_by_key" ON "likes"("transaction_hash", "liked_by");
