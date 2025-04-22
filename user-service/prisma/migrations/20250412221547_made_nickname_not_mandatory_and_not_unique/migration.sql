-- DropIndex
DROP INDEX "Profile_nickname_key";

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "nickname" DROP NOT NULL;
