import {
  findVariable,
  getVariable,
  loadConfigForEnvironment
} from "@link1900/node-environment";
import {
  GraphqlExternalApiErrorFormatter,
  GraphqlJavascriptErrorFormatter,
  GraphqlServerErrorFormatter,
  GraphqlUnauthenticatedErrorFormatter,
  GraphqlUserInputErrorFormatter,
  registerGraphqlErrorFormatters
} from "@link1900/node-graphql";
import { logger, LogTypes } from "@link1900/node-logger";

const ENV_VARS_TO_LOG = ["TZ", "LOG_LEVEL", "GRAPHQL_TRACING", "MASK_ERRORS"];

export function logEnvironmentVariable(varName: string) {
  logger.info(
    `Environment variable [${varName}] set as [${findVariable(varName)}]`
  );
}

export function logEnvironmentVariables() {
  ENV_VARS_TO_LOG.forEach(logEnvironmentVariable);
}

export async function applicationInit(configPath: string) {
  await loadConfigForEnvironment(configPath);
  logger.level = getVariable("LOG_LEVEL", "info") as LogTypes;
  logEnvironmentVariables();
  registerGraphqlErrorFormatters([
    new GraphqlUserInputErrorFormatter(),
    new GraphqlExternalApiErrorFormatter(),
    new GraphqlUnauthenticatedErrorFormatter(),
    new GraphqlServerErrorFormatter(),
    new GraphqlJavascriptErrorFormatter()
  ]);
}
