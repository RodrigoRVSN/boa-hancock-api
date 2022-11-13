-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "matched_user_id" TEXT NOT NULL,
    "matched_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "to_user_id" TEXT NOT NULL,
    "is_liked" BOOLEAN NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "repos_url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "company" TEXT,
    "blog" TEXT,
    "location" TEXT,
    "email" TEXT,
    "hireable" BOOLEAN NOT NULL,
    "bio" TEXT,
    "twitter_username" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Match_id_key" ON "Match"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Like_id_key" ON "Like"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Like_user_id_key" ON "Like"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
