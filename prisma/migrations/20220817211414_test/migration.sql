/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Super_Admin', 'Admin', 'Dispatcher', 'Trainee', 'Member');

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'Member',
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "User_Profile" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "phoneNo" INTEGER NOT NULL,
    "carrier" TEXT NOT NULL,
    "alertType" TEXT NOT NULL,
    "zipCode" INTEGER NOT NULL,
    "cityState" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "User_Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Incident" (
    "id" SERIAL NOT NULL,
    "User_ID" INTEGER NOT NULL,
    "Co_Credit" TEXT NOT NULL,
    "Country" TEXT NOT NULL,
    "Time" TIMESTAMP(3) NOT NULL,
    "Type" TEXT NOT NULL,
    "Street" TEXT NOT NULL,
    "City" TEXT NOT NULL,
    "State" TEXT NOT NULL,
    "Longitude" DOUBLE PRECISION NOT NULL,
    "Latitude" DOUBLE PRECISION NOT NULL,
    "Zipcode" INTEGER NOT NULL,
    "Text" TEXT NOT NULL,
    "SMS_Chr_Count" INTEGER NOT NULL,
    "Internal_Note" TEXT NOT NULL,
    "Confirmed_Incident" BOOLEAN NOT NULL,

    CONSTRAINT "Incident_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Incident_User_ID_key" ON "Incident"("User_ID");

-- CreateIndex
CREATE INDEX "Incident_User_ID_idx" ON "Incident"("User_ID");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User_Profile" ADD CONSTRAINT "User_Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
