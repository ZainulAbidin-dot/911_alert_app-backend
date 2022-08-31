import fastify from "fastify";
import dotenv from "dotenv";
import sensible from "@fastify/sensible";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
dotenv.config();

const app = fastify();
app.register(sensible);
app.register(cors, {
  origin: process.env.CLIENT_URL,
  credentials: true,
});
const prisma = new PrismaClient();

const Users = (fastify, options, done) => {
  fastify.get("/users", async (req, res) => {
    return await commitToDb(prisma.user.findMany());
  });

  fastify.post("/user_create", async (req, res) => {
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

  done();
};

module.exports = Users;
