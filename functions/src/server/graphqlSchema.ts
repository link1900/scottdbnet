import ServerContext from './ServerContext';
import { GraphqlSchemaDefinition } from '../graphql/graphqlSchemaTypes';
import { relayMutationMiddleware } from '../graphql/graphqlMiddlewares';
import { getDatabaseConnection } from './serverHelper';
import { createDataLoaders } from './dataLoaders';
import { applicationConfigType } from '../applicationConfig/applicationConfigType';
import { greyhoundType } from '../ranker/greyhound/greyhoundType';
import { testType, testTypeQuery } from '../ranker/greyhound/testType';
import { dateTimeType } from '../graphql/types/dateTimeType';

export async function createBaseContext(): Promise<ServerContext> {
  const connection = await getDatabaseConnection();
  const loaders = await createDataLoaders(connection);
  return new ServerContext(loaders);
}

export async function createContextFromRequest(): Promise<ServerContext> {
  return await createBaseContext();
}

export const graphqlSchemaDefinition: GraphqlSchemaDefinition = {
  contextFromRequestGenerator: createContextFromRequest,
  mutationMiddlewares: [relayMutationMiddleware],
  graphqlTypeDefinitions: [
    // common
    applicationConfigType,
    dateTimeType,

    // ranker
    greyhoundType,
    testTypeQuery,
    testType
  ]
};
