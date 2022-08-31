/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `cityState` on the `User_Profile` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User_Profile` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode` on the `User_Profile` table. All the data in the column will be lost.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.
  - Changed the column `role` on the `User` table from a scalar field to a list field. If there are non-null values in that column, this step will fail.
  - Added the required column `notificationArea` to the `User_Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pagerEmail` to the `User_Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personalInfo` to the `User_Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `realName` to the `User_Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sendTextNotification` to the `User_Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sendToEmail` to the `User_Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sendToPager` to the `User_Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "username" TEXT NOT NULL,
ALTER COLUMN "role" SET DEFAULT ARRAY['Member']::"Role"[],
ALTER COLUMN "role" SET DATA TYPE "Role"[];

-- AlterTable
ALTER TABLE "User_Profile" DROP COLUMN "cityState",
DROP COLUMN "username",
DROP COLUMN "zipCode",
ADD COLUMN     "notificationArea" TEXT NOT NULL,
ADD COLUMN     "notificationTypes" TEXT[],
ADD COLUMN     "pagerEmail" TEXT NOT NULL,
ADD COLUMN     "personalInfo" TEXT NOT NULL,
ADD COLUMN     "realName" TEXT NOT NULL,
ADD COLUMN     "sendTextNotification" BOOLEAN NOT NULL,
ADD COLUMN     "sendToEmail" BOOLEAN NOT NULL,
ADD COLUMN     "sendToPager" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "Residence" (
    "id" SERIAL NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "ZipCode" INTEGER NOT NULL,
    "DateOfBirth" TIMESTAMP(3) NOT NULL,
    "Occupation" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Residence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat_Messages" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "Message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Chat_Messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin_Main_Setting" (
    "id" SERIAL NOT NULL,
    "system_name" TEXT NOT NULL DEFAULT '911BreakingNews.com',
    "backgroundColor" TEXT NOT NULL DEFAULT '#000000',
    "fontColor" TEXT NOT NULL DEFAULT '#ffffff',
    "alertFormat" TEXT NOT NULL,
    "state_to_import_wheather_alert" TEXT NOT NULL DEFAULT 'DE',
    "logo" BYTEA NOT NULL,
    "domain" TEXT NOT NULL DEFAULT 'cad.911breakingnews.com',
    "CAD_URL" TEXT NOT NULL DEFAULT 'https://cad.911breakingnews.com/',
    "private_system" BOOLEAN NOT NULL DEFAULT true,
    "guest_not_allowed_to_chat" BOOLEAN NOT NULL DEFAULT true,
    "theme" TEXT NOT NULL DEFAULT 'Steal (2)',
    "fontSize" TEXT NOT NULL DEFAULT '16px',
    "traineeAlertColor" TEXT NOT NULL DEFAULT '#663366',

    CONSTRAINT "Admin_Main_Setting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin_Email_SMS_Setting" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Admin_Email_SMS_Setting_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Residence" ADD CONSTRAINT "Residence_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat_Messages" ADD CONSTRAINT "Chat_Messages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
