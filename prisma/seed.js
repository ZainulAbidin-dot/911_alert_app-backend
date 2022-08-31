import { PrismaClient, Role } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
  await prisma.User.deleteMany();
  await prisma.User_Profile.deleteMany();
  //   await prisma.incident.deleteMany();

  const john = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@gmail.com",
      password: "john",
      role: Role.Super_Admin,
    },
  });

  const sally = await prisma.user.create({
    data: {
      name: "Sally Kelly",
      email: "sally@gmail.com",
      password: "sally",
    },
  });

  const John_Profile = await prisma.user_Profile.create({
    data: {
      username: "jdoe",
      phoneNo: 32,
      carrier: "32CN",
      alertType: "CN32",
      zipCode: 75850,
      cityState: "North Carolina",
      userId: john.id,
    },
  });

  const Sally_Profile = await prisma.user_Profile.create({
    data: {
      username: "skelly",
      phoneNo: 34,
      carrier: "34CN",
      alertType: "CN34",
      zipCode: 75854,
      cityState: "South Carolina",
      userId: sally.id,
    },
  });

  const incident = await prisma.incident.create({
    data: {
      User_ID: john.id,
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
}

seed()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
