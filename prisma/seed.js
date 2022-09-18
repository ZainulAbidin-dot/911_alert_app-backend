import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
  // await prisma.Incident.deleteMany();
  await prisma.user.deleteMany();
  // await prisma.User_Profile.deleteMany();

  const john = await prisma.user.create({
    data: {
      username: "John Doe",
      email: "john@gmail.com",
      password: "john",
      role: "Super Admin",
    },
  });

  const sally = await prisma.user.create({
    data: {
      username: "Sally Kelly",
      email: "sally@gmail.com",
      password: "sally",
      role: "Member",
    },
  });

  const John_Profile = await prisma.user_Profile.create({
    data: {
      realName: "jdoe",
      phoneNo: 32,
      carrier: "32CN",
      alertType: "CN32",
      pagerEmail: "pagerJ@gmail.com",
      notificationArea: "area1",
      notificationTypes: "Phone",
      personalInfo: "I am man",
      sendToEmail: true,
      sendTextNotification: true,
      sendToPager: true,
      userId: john.id,
    },
  });

  const Sally_Profile = await prisma.user_Profile.create({
    data: {
      realName: "skelly",
      phoneNo: 34,
      carrier: "34CN",
      alertType: "CN34",
      pagerEmail: "pagerS@gmail.com",
      notificationArea: "area2",
      notificationTypes: "Pager",
      personalInfo: "I am girl",
      sendToEmail: true,
      sendTextNotification: true,
      sendToPager: true,
      userId: sally.id,
    },
  });

  const John_Resident = await prisma.residence.create({
    data: {
      city: "Karachi",
      address: "RS 26 /ST  12 N.Nazimabad",
      state: "Sindh",
      ZipCode: 85850,
      // DateOfBirth: "25-9-91",
      Occupation: "Killer",
      userId: john.id,
    },
  });

  const Sally_Resident = await prisma.residence.create({
    data: {
      city: "Karachi",
      address: "FB AREA",
      state: "Islamabad",
      ZipCode: 85851,
      // DateOfBirth: "5-9-94",
      Occupation: "Writer",
      userId: sally.id,
    },
  });

  const John_incident = await prisma.incident.create({
    data: {
      userId: john.id,
      Co_Credit: "c3c",
      Country: "America",
      Type: "C",
      Street: "Rs 12 / St 1",
      City: "North Carolina",
      State: "Ohio",
      Longitude: 3.142,
      Latitude: 2.424,
      Zipcode: 75859,
      Text: "Fire in C building one",
      SMS_Chr_Count: 2,
      Internal_Note: "Urgent Req",
      Confirmed_Incident: true,
    },
  });

  const John_incident2 = await prisma.incident.create({
    data: {
      userId: john.id,
      Co_Credit: "z2z",
      Country: "Canada",
      Type: "C",
      Street: "Rs 12 / St 1",
      City: "North Iowa",
      State: "Ohio",
      Longitude: 3.142,
      Latitude: 2.424,
      Zipcode: 75859,
      Text: "Fire in C building one",
      SMS_Chr_Count: 2,
      Internal_Note: "Urgent Req",
      Confirmed_Incident: false,
    },
  });

  const John_incident3 = await prisma.incident.create({
    data: {
      userId: john.id,
      Co_Credit: "c3c",
      Country: "Jezbak",
      Type: "C",
      Street: "Rs 14 / St 1",
      City: "North Carolina",
      State: "Ohio",
      Longitude: 3.142,
      Latitude: 2.424,
      Zipcode: 75859,
      Text: "Fire in C building one",
      SMS_Chr_Count: 2,
      Internal_Note: "Urgent Req",
      Confirmed_Incident: true,
    },
  });

  const Sally_incident = await prisma.incident.create({
    data: {
      userId: sally.id,
      Co_Credit: "b4b",
      Country: "Australia",
      Type: "AT&A",
      Street: "Rs 12 / St 1",
      City: "North Carolina",
      State: "Ohio",
      Longitude: 3.142,
      Latitude: 2.424,
      Zipcode: 75859,
      Text: "Fire in C building one",
      SMS_Chr_Count: 2,
      Internal_Note: "Urgent Req",
      Confirmed_Incident: true,
    },
  });
  const Sally_incident2 = await prisma.incident.create({
    data: {
      userId: sally.id,
      Co_Credit: "d2d",
      Country: "Australia",
      Type: "AT&T",
      Street: "Rs 12 / St 1",
      City: "North Ohio",
      State: "Ohio",
      Longitude: 3.142,
      Latitude: 2.424,
      Zipcode: 75859,
      Text: "Fire in C building three",
      SMS_Chr_Count: 2,
      Internal_Note: "Urgent Req",
      Confirmed_Incident: false,
    },
  });
  const Sally_incident3 = await prisma.incident.create({
    data: {
      userId: sally.id,
      Co_Credit: "d2d",
      Country: "America",
      Type: "AT&T",
      Street: "Rs 12 / St 12",
      City: "North Ohio",
      State: "Ohio",
      Longitude: 3.142,
      Latitude: 2.424,
      Zipcode: 75859,
      Text: "Fire in C building three",
      SMS_Chr_Count: 2,
      Internal_Note: " Req",
      Confirmed_Incident: true,
    },
  });
}

seed()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
