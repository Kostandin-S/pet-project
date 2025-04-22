/*
  Warnings:

  - Made the column `bookTitle` on table `UserBooks` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bookAuthor` on table `UserBooks` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UserBooks" ALTER COLUMN "bookTitle" SET NOT NULL,
ALTER COLUMN "bookAuthor" SET NOT NULL;
