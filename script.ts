import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user_Profile = await prisma.user_Profile.create({
    data: {
      username: "jdoe",
      phoneNo: 32,
      carrier: "",
      alertType: "",
      zipCode: 75850,
      cityState: "",
      userId: 1,
    },
  });

  // const user = await prisma.user.create({
  //   data: {
  //     name: "John Doe2",
  //     email: "j2@gmail.com",
  //     password: "",
  //     User_Profile:{
  //       username: "jdoe",
  //       phoneNo: "",
  //       carrier: "",
  //       alertType: "",
  //       zipCode: "",
  //       cityState: "",
  //       user: "",
  //       userId: "",

  //     }
  //   },
  // });
  // console.log(user);
  console.log(user_Profile);
}

main()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
