import { GraphQLSchema } from "graphql";
import { createGraphqlSchema } from "./schema";

let schema: GraphQLSchema | undefined;

export function getGraphqlSchema(): GraphQLSchema {
  if (!schema) {
    schema = createGraphqlSchema();
  }
  return schema;
}
