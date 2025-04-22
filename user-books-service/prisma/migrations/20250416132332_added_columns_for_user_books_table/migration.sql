-- CreateEnum
CREATE TYPE "BookStatus" AS ENUM ('NotStarted', 'InProgress', 'Completed');

-- CreateTable
CREATE TABLE "UserBooks" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "bookId" INTEGER NOT NULL,
    "status" "BookStatus" NOT NULL DEFAULT 'NotStarted',
    "bookTitle" TEXT,
    "bookAuthor" TEXT,
    "rating" INTEGER,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserBooks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserBooks_userId_bookId_key" ON "UserBooks"("userId", "bookId");
