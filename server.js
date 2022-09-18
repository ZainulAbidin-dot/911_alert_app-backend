import fastify from "fastify";
import dotenv from "dotenv";
import sensible from "@fastify/sensible";
import cors from "@fastify/cors";
import fastifyJwt from "fastify-jwt";
import { PrismaClient } from "@prisma/client";
dotenv.config();

export const app = fastify();
app.register(sensible);
app.register(cors, {
  origin: process.env.CLIENT_URL,
  credentials: true,
});
app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET,
});

const prisma = new PrismaClient();

//! Generate Token
app.get("/generateToken/:id", (req, reply) => {
  const data = {
    id: req.params.id,
    name: "Sally",
  };
  const token = app.jwt.sign(data);
  reply.send({ token });
});

//! Authentiction Decorator
app.decorate("authenticate", async function (req, reply) {
  // console.log(req.headers.authorization);

  try {
    await req.jwtVerify();
  } catch (error) {
    reply.send(error);
  }
});

//! Validate Users
app.get(
  "/validateToken",
  { onRequest: app.authenticate },
  async function (request, reply) {
    return request.user;
  }
);

//! Users API

//* Get All Users
app.get("/users", async (req, res) => {
  return await commitToDb(prisma.user.findMany());
});

//* Get Specific Role Type Users
app.get("/specific_users/:role", async (req, res) => {
  if (req.params.message === "" || req.params.message === null) {
    return res.send(app.httpErrors.badRequest("Message is Required"));
  }
  console.log(req);
  return await commitToDb(
    prisma.user.findMany({
      where: {
        role: req.params.role,
      },
    })
  );
});

//* Create A User
app.post("/user_create", async (req, res) => {
  if (req.body.message === "" || req.body.message === null) {
    return res.send(app.httpErrors.badRequest("Message is Required"));
  }
  return await commitToDb(
    prisma.user.create({
      data: {
        username: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      },
      select: {
        id: true,
      },
    }),
    prisma.user_Profile.create({})
  );
});

//* Update User
app.patch("/user_update", async (req, res) => {
  if (req.body.message === "" || req.body.message === null) {
    return res.send(app.httpErrors.badRequest("Message is Required"));
  }
  return await commitToDb(
    prisma.user.update({
      where: {
        id: parseInt(req.body.id),
      },
      data: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      },
    })
  );
});

//!  User Profile API

app.get("/user_profile/:id", async (req, res) => {
  return await commitToDb(
    prisma.user_Profile.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    })
  );
});

app.post("/user_profile_create", async (req, res) => {
  if (req.body.message === "" || req.body.message === null) {
    return res.send(app.httpErrors.badRequest("Message is Required"));
  }
  return await commitToDb(
    prisma.user_Profile.create({
      data: {
        realname: req.body.realname,
        phoneNo: req.body.phoneNo,
        carrier: req.body.carrier,
        notificationArea: req.body.notificationArea,
        notificationTypes: req.body.notificationTypes,
        personalInfo: req.body.personalInfo,
        sendToEmail: req.body.sendToEmail,
        sendToPager: req.body.sendToPager,
      },
    })
  );
});

app.patch("/user_profile_update", async (req, res) => {
  if (req.body.message === "" || req.body.message === null) {
    return res.send(app.httpErrors.badRequest("Message is Required"));
  }
  return await commitToDb(
    prisma.user_Profile.update({
      where: {
        id: parseInt(req.body.id),
      },
      data: {
        realName: req.body.realName,
        pagerEmail: req.body.pagerEmail,
        notificationArea: req.body.notificationArea,
        notificationTypes: req.body.notificationTypes,
        personalInfo: req.body.personalInfo,
        sendToEmail: req.body.sendToEmail,
        sendToPager: req.body.sendToPager,
      },
    })
  );
});

//!  Icident API

//* All the Incident List
/* This is a route that is used to get all the incidents. */
app.get("/incident", async (req, res) => {
  return await commitToDb(
    prisma.incident.findMany({
      select: {
        Time: true,
        Street: true,
        City: true,
        State: true,
        Type: true,
        Text: true,
        user: true,
      },
    })
  );
});

//* All the Queue Incident List
app.get("/queue_incident", async (req, res) => {
  return await commitToDb(
    prisma.incident.findMany({
      where: {
        Queue: true,
      },
      select: {
        Time: true,
        Street: true,
        City: true,
        State: true,
        Type: true,
        Text: true,
        user: true,
      },
    })
  );
});

//* A Specific User Incident List
app.get("/incident/:id", async (req, res) => {
  return await commitToDb(
    prisma.incident.findMany({
      where: {
        userId: parseInt(req.params.id),
      },
      select: {
        Time: true,
        State: true,
        City: true,
        Street: true,
        Type: true,
        Text: true,
      },
    })
  );
});

//* A Specific User Queue Incident List
app.get("/queue_incident/:id", async (req, res) => {
  return await commitToDb(
    prisma.incident.findMany({
      where: {
        userId: parseInt(req.params.id),
        Queue: true,
      },
      select: {
        Time: true,
        State: true,
        City: true,
        Street: true,
        Type: true,
        Text: true,
      },
    })
  );
});

// * Create an Incident
app.post("/incident", async (req, res) => {
  if (req.body.message === "" || req.body.message === null) {
    return res.send(app.httpErrors.badRequest("Message is Required"));
  }
  return await commitToDb(
    prisma.incident.create({
      data: {
        userId: req.body.userId,
        Co_Credit: req.body.Co_Credit,
        Country: req.body.Country,
        Type: req.body.Type,
        Street: req.body.Street,
        City: req.body.City,
        State: req.body.State,
        Longitude: req.body.Longitude,
        Latitude: req.body.Latitude,
        Zipcode: req.body.Zipcode,
        Text: req.body.Text,
        SMS_Chr_Count: req.body.SMS_Chr_Count,
        Internal_Note: req.body.Internal_Note,
        Confirmed_Incident: req.body.Confirmed_Incident,
      },
    })
  );
});

//* Update The Queue Status of The Incident
app.patch("/incident_update_queue/:id", async (req, res) => {
  if (req.body.message === "" || req.body.message === null) {
    return res.send(app.httpErrors.badRequest("Message is Required"));
  }
  return await commitToDb(
    prisma.incident.create({
      where: {
        id: req.params.id,
      },
      data: {
        Queue: req.body.Queue,
      },
    })
  );
});

// * Update Incident Altogether
app.post("/incident_update/:id", async (req, res) => {
  if (req.body.message === "" || req.body.message === null) {
    return res.send(app.httpErrors.badRequest("Message is Required"));
  }
  return await commitToDb(
    prisma.incident.create({
      where: {
        userId: req.params.id,
      },
      data: {
        Co_Credit: req.body.Co_Credit,
        Country: req.body.Country,
        Type: req.body.Type,
        Street: req.body.Street,
        City: req.body.City,
        State: req.body.State,
        Longitude: req.body.Longitude,
        Latitude: req.body.Latitude,
        Zipcode: req.body.Zipcode,
        Text: req.body.Text,
        SMS_Chr_Count: req.body.SMS_Chr_Count,
        Internal_Note: req.body.Internal_Note,
        Confirmed_Incident: req.body.Confirmed_Incident,
      },
    })
  );
});

//!  Chat API

app.get("/chatMessages", async (req, res) => {
  return await commitToDb(
    prisma.Chat_Messages.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })
  );
});

app.post("/chatMessage", async (req, res) => {
  if (req.body.message === "" || req.body.message === null) {
    return res.send(app.httpErrors.badRequest("Message is Required"));
  }
  return await commitToDb(
    prisma.chat_Messages.create({
      data: {
        name: req.body.name,
        Message: req.body.Message,
        userId: req.body.userId,
      },
    })
  );
});

//! Residence API

app.post("/residence_create", async (req, res) => {
  if (req.body.message === "" || req.body.message === null) {
    return res.send(app.httpErrors.badRequest("Message is Required"));
  }
  return await commitToDb(
    prisma.residence.create({
      data: {
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        ZipCode: req.body.ZipCode,
        DateOfBirth: req.body.DateOfBirth,
        Occupation: req.body.Occupation,
        userId: req.body.userId,
      },
    })
  );
});

async function commitToDb(promise) {
  const [error, data] = await app.to(promise);
  if (error) return app.httpErrors.internalServerError(error.message);
  return data;
}

app.listen({ port: process.env.PORT }, (err) => {
  if (err) {
    throw err;
  } else {
    console.log(`Server is Running on PORT: ${process.env.PORT}`);
  }
});
