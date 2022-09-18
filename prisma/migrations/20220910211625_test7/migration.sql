/*
  Warnings:

  - You are about to drop the column `User_ID` on the `Incident` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Incident` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Incident_User_ID_idx";

-- DropIndex
DROP INDEX "Incident_User_ID_key";

-- AlterTable
ALTER TABLE "Incident" DROP COLUMN "User_ID",
ADD COLUMN     "Queue" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
