-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Profile" (
    "id" SERIAL NOT NULL,
    "realName" TEXT NOT NULL,
    "pagerEmail" TEXT NOT NULL,
    "notificationArea" TEXT NOT NULL,
    "notificationTypes" TEXT[],
    "personalInfo" TEXT NOT NULL,
    "sendToEmail" BOOLEAN NOT NULL,
    "sendTextNotification" BOOLEAN NOT NULL,
    "sendToPager" BOOLEAN NOT NULL,
    "phoneNo" INTEGER NOT NULL,
    "carrier" TEXT NOT NULL,
    "alertType" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "User_Profile_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "Incident" (
    "id" SERIAL NOT NULL,
    "User_ID" INTEGER NOT NULL,
    "Co_Credit" TEXT NOT NULL,
    "Country" TEXT NOT NULL,
    "Time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
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

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Incident_User_ID_key" ON "Incident"("User_ID");

-- CreateIndex
CREATE INDEX "Incident_User_ID_idx" ON "Incident"("User_ID");

-- AddForeignKey
ALTER TABLE "User_Profile" ADD CONSTRAINT "User_Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Residence" ADD CONSTRAINT "Residence_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat_Messages" ADD CONSTRAINT "Chat_Messages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
