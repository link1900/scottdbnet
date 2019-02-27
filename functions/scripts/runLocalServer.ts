import express, { Express } from 'express';
import logger from '../src/logging/logger';
import { loadEnvironmentVariablesFromConfig } from '../src/environment/environmentHelper';
import { GraphqlSchemaDefinition } from '../src/graphql/graphqlSchemaTypes';
import { createGraphqlSchemaParts } from '../src/graphql/graphqlSchemaBuilders';
import { ApolloServer } from 'apollo-server-express';
import { handleGraphqlError } from '../src/server/graphqlErrorHelper';
import { graphqlSchemaDefinition } from '../src/server/graphqlSchema';

startServer()
  .then(() => {
    logger.info('Server start up is complete');
  })
  .catch((error: Error) => {
    logger.error(`Error starting server`, error.toString(), error.stack);
  });

export function setupExpress() {
  return express();
}

export async function startHTTP(expressApp: Express) {
  logger.info('Starting express server');
  return new Promise(resolve => {
    const port = '3030';
    const address = 'localhost';
    expressApp.listen({ port, address }, () => {
      logger.info(`🚀 Server ready at http://${address}:${port}`);
      resolve();
    });
  });
}

export function setupGraphqlEndpointForExpress(expressApp: Express, schema: GraphqlSchemaDefinition) {
  logger.info('Setting up apollo server middleware at /graphql');
  const graphqlSchemaParts = createGraphqlSchemaParts(schema);
  const apolloServer = new ApolloServer({
    typeDefs: graphqlSchemaParts.typeDefs,
    resolvers: graphqlSchemaParts.resolvers,
    schemaDirectives: graphqlSchemaParts.directives,
    context: graphqlSchemaParts.contextGenerator,
    tracing: true,
    introspection: true,
    playground: true,
    formatError: handleGraphqlError
  });

  apolloServer.applyMiddleware({ app: expressApp });
  return apolloServer;
}

export async function setupServer(): Promise<Express> {
  await loadEnvironmentVariablesFromConfig();
  const expressApp = setupExpress();
  setupGraphqlEndpointForExpress(expressApp, graphqlSchemaDefinition);
  return expressApp;
}

export async function startServer() {
  logger.info('Starting up server');
  const app = await setupServer();
  await startHTTP(app);
  return app;
}
