-- DropForeignKey
ALTER TABLE "User_Profile" DROP CONSTRAINT "User_Profile_userId_fkey";

-- AlterTable
ALTER TABLE "Incident" ALTER COLUMN "Time" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "User_Profile" ADD CONSTRAINT "User_Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
