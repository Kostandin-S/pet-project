/*
  Warnings:

  - The primary key for the `Book` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `BookGenres` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Genre` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "BookGenres" DROP CONSTRAINT "BookGenres_bookId_fkey";

-- DropForeignKey
ALTER TABLE "BookGenres" DROP CONSTRAINT "BookGenres_genreId_fkey";

-- AlterTable
ALTER TABLE "Book" DROP CONSTRAINT "Book_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Book_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Book_id_seq";

-- AlterTable
ALTER TABLE "BookGenres" DROP CONSTRAINT "BookGenres_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "bookId" SET DATA TYPE TEXT,
ALTER COLUMN "genreId" SET DATA TYPE TEXT,
ADD CONSTRAINT "BookGenres_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "BookGenres_id_seq";

-- AlterTable
ALTER TABLE "Genre" DROP CONSTRAINT "Genre_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Genre_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Genre_id_seq";

-- AddForeignKey
ALTER TABLE "BookGenres" ADD CONSTRAINT "BookGenres_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookGenres" ADD CONSTRAINT "BookGenres_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;
