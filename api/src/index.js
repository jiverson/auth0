import { ApolloServer } from "apollo-server-express";
import "dotenv/config";
import express from "express";
import jwt from "express-jwt";
import jwtAuthz from "express-jwt-authz";
import jwksRsa from "jwks-rsa";
import mongoose from "mongoose";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw "Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file";
}

const startServer = async () => {
  const app = express();

  const corsOptions = {
    credentials: true,
    origin: "http://localhost:3000"
  };

  const checkJwt = jwt({
    // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),

    // Validate the audience and the issuer.
    audience: process.env.AUTH0_AUDIENCE,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ["RS256"]
  });

  app.use(checkJwt);

  const checkScopes = jwtAuthz(["read:quotes"]);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => ({
      user: req.user
    })
  });

  server.applyMiddleware({
    app,
    cors: corsOptions
  });

  await mongoose.connect("mongodb://localhost:27017/test3", {
    useNewUrlParser: true,
    useFindAndModify: false
  });

  app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
};

startServer();
