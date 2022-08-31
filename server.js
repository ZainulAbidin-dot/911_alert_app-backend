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

// Generate Token
app.get("/generateToken/:id", (req, reply) => {
  const data = {
    id: req.params.id,
    name: "Sally",
  };
  const token = app.jwt.sign(data);
  reply.send({ token });
});

// Authentiction Decorator
app.decorate("authenticate", async function (req, reply) {
  // console.log(req.headers.authorization);

  try {
    await req.jwtVerify();
  } catch (error) {
    reply.send(error);
  }
});

app.get(
  "/validateToken",
  { onRequest: app.authenticate },
  async function (request, reply) {
    return request.user;
  }
);

// Users API

app.get("/users", async (req, res) => {
  return await commitToDb(prisma.user.findMany());
});

app.post("/user_create", async (req, res) => {
  if (req.body.message === "" || req.body.message === null) {
    return res.send(app.httpErrors.badRequest("Message is Required"));
  }
  return await commitToDb(
    prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      },
    })
  );
});

app.patch("/user_update/:id", async (req, res) => {
  if (req.body.message === "" || req.body.message === null) {
    return res.send(app.httpErrors.badRequest("Message is Required"));
  }
  return await commitToDb(
    prisma.user.update({
      where: {
        userId: parseInt(req.params.id),
      },
      data: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      },
    })
  );
});

//  User Profile API

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
        alertType: req.body.alertType,
        zipCode: req.body.zipCode,
        cityState: req.body.cityState,
      },
    })
  );
});

app.patch("/user_profile_update/:id", async (req, res) => {
  if (req.body.message === "" || req.body.message === null) {
    return res.send(app.httpErrors.badRequest("Message is Required"));
  }
  return await commitToDb(
    prisma.user_Profile.update({
      where: {
        userId: parseInt(req.params.id),
      },
      data: {
        realname: req.body.realname,
        phoneNo: req.body.phoneNo,
        carrier: req.body.carrier,
        alertType: req.body.alertType,
        zipCode: req.body.zipCode,
        cityState: req.body.cityState,
      },
    })
  );
});

//  Icident API

app.get("/incident", async (req, res) => {
  return await commitToDb(prisma.incident.findMany());
});

app.post("/incident", async (req, res) => {
  if (req.body.message === "" || req.body.message === null) {
    return res.send(app.httpErrors.badRequest("Message is Required"));
  }
  return await commitToDb(
    prisma.incident.create({
      data: {
        User_ID: req.body.User_ID,
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
