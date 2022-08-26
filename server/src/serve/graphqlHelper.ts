import { handleGraphqlError } from "@link1900/node-graphql";
import { Request, Response } from "express";
import { Config } from "apollo-server-lambda";
import { getContextSequence } from "../context/contextHelper";
import { getGraphqlSchema } from "./graphqlSchemaHelper";

export function getApolloServerConfigForExpress(): Config {
  return {
    schema: getGraphqlSchema(),
    context: getContextForExpressRequest,
    formatError: handleGraphqlError
  };
}

export function getApolloServerConfigForLambda(): Config {
  return {
    ...getApolloServerConfigForExpress(),
    context: getContextForLambdaRequest
  };
}

export async function getContextForLambdaRequest({ express }: any) {
  return getContextForRequest(express.req, express.response);
}

export async function getContextForExpressRequest({ req, res }: any) {
  return getContextForRequest(req, res);
}

export async function getContextForRequest(req: Request, res: Response) {
  return getContextSequence().runSteps({ express: { req, res } });
}
