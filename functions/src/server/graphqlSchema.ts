import ServerContext from './ServerContext';
import { Context, GraphqlSchemaDefinition } from '../graphql/graphqlSchemaTypes';
import { relayMutationMiddleware } from '../graphql/graphqlMiddlewares';
import { applicationConfigType } from '../applicationConfig/applicationConfigType';

export function createContextFromRequest(): Context {
  return new ServerContext();
}

export const graphqlSchemaDefinition: GraphqlSchemaDefinition = {
  contextFromRequestGenerator: createContextFromRequest,
  mutationMiddlewares: [relayMutationMiddleware],
  graphqlTypeDefinitions: [
    // common
    applicationConfigType
  ]
};
