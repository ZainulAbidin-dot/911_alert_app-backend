-- DropForeignKey
ALTER TABLE "Residence" DROP CONSTRAINT "Residence_userId_fkey";

-- AddForeignKey
ALTER TABLE "Residence" ADD CONSTRAINT "Residence_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
