/*
  Warnings:

  - The primary key for the `UserBooks` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "UserBooks" DROP CONSTRAINT "UserBooks_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "bookId" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserBooks_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserBooks_id_seq";
