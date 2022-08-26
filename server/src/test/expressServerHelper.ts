import express, { Express, Request, Response } from "express";
import cors from "cors";
import { Server } from "http";
import { logger } from "@link1900/node-logger";
import { getVariable } from "@link1900/node-environment";
import { getApolloServerConfigForExpress } from "../serve/graphqlHelper";
import { ApolloServer } from "apollo-server-express";

export async function startServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  await setupGraphqlEndpointForExpress(app);
  setupRoutes(app);
  const server = await startHTTP(app);
  return {
    server,
    app
  };
}

export async function startHTTP(expressApp: Express): Promise<Server> {
  logger.info("Starting express server");
  return new Promise((resolve) => {
    const port = getVariable("PORT", "3030");
    const address = getVariable("ADDRESS", "localhost");
    const server = expressApp.listen({ port, address }, () => {
      logger.info(`🚀 Server ready at http://${address}:${port}`);
      resolve(server);
    });
  });
}

export function setupRoutes(app: Express) {
  app.get("/health", function (req: Request, res: Response) {
    res.json({ running: true });
  });
}

export async function setupGraphqlEndpointForExpress(expressApp: Express) {
  logger.info("Setting up apollo server middleware at /graphql");
  const apolloServer = new ApolloServer(getApolloServerConfigForExpress());
  await apolloServer.start();
  apolloServer.applyMiddleware({ app: expressApp });
  return apolloServer;
}
