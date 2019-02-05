import ServerContext from './ServerContext';
import { Context, GraphqlSchemaDefinition } from '../graphql/graphqlSchemaTypes';
import { relayMutationMiddleware } from '../graphql/graphqlMiddlewares';
import { applicationConfigType } from '../applicationConfig/applicationConfigType';
import { setupDatabaseConnection } from './serverHelper';
import { createDataLoaders } from './dataLoaders';

export async function createBaseContext(): Promise<Context> {
  const { models } = await setupDatabaseConnection();
  const loaders = await createDataLoaders(models);

  return new ServerContext(loaders);
}

export async function createContextFromRequest(): Promise<Context> {
  return await createBaseContext();
}

export const graphqlSchemaDefinition: GraphqlSchemaDefinition = {
  contextFromRequestGenerator: createContextFromRequest,
  mutationMiddlewares: [relayMutationMiddleware],
  graphqlTypeDefinitions: [
    // common
    applicationConfigType
  ]
};
