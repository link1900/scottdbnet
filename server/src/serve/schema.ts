import { buildSchemaSync } from "type-graphql";
import { ApplicationInfoResolver } from "../features/applicationInfo/ApplicationInfoResolver";

export function createGraphqlSchema() {
  return buildSchemaSync({
    resolvers: [ApplicationInfoResolver]
  });
}
