import "reflect-metadata";
import {
  setTestContextProvider,
  setTestSchemaProvider
} from "@link1900/node-test-util";
import path from "path";
import { applicationInit } from "../serve/configHelper";
import { getGraphqlSchema } from "../serve/graphqlSchemaHelper";

beforeAll(async () => {
  await applicationInit(path.join(__dirname, "..", "config"));

  setTestSchemaProvider(async () => getGraphqlSchema());
  setTestContextProvider(async () => {
    return {};
  });
});
