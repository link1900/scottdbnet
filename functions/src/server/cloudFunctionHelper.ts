import { ApolloServer } from 'apollo-server-cloud-functions';
import { createGraphqlSchemaParts } from '../graphql/graphqlSchemaBuilders';
import { graphqlSchemaDefinition } from './graphqlSchema';
import { handleGraphqlError } from './graphqlErrorHelper';
import logger from '../logging/logger';

export function getApolloServer() {
  const graphqlSchemaParts = createGraphqlSchemaParts(graphqlSchemaDefinition);
  logger.info('creating apollo server');
  return new ApolloServer({
    typeDefs: graphqlSchemaParts.typeDefs,
    resolvers: graphqlSchemaParts.resolvers,
    context: graphqlSchemaParts.contextGenerator,
    playground: true,
    introspection: true,
    formatError: handleGraphqlError
  });
}
