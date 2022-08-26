import "reflect-metadata";
import "source-map-support/register";
import path from "path";
import { ApolloServer } from "apollo-server-lambda";
import { applicationInit } from "./serve/configHelper";
import { getApolloServerConfigForLambda } from "./serve/graphqlHelper";

const server = new ApolloServer(getApolloServerConfigForLambda());

let lambdaHandler: any;

exports.handler = async function handlerWrapper(event: any, context: any) {
  if (!lambdaHandler) {
    await applicationInit(path.join(".", "src", "config"));
    lambdaHandler = server.createHandler({
      expressGetMiddlewareOptions: {
        cors: {
          origin: "*",
          credentials: true
        }
      }
    });
  }

  return lambdaHandler(event, context);
};
