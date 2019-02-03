import * as functions from 'firebase-functions';
import { getApolloServer } from './server/cloudFunctionHelper';
import { loadEnvironmentVariablesFromConfig } from './environment/environmentHelper';

process.env.EXECUTION_ENVIRONMENT = functions.config().core.executionenvironment;
loadEnvironmentVariablesFromConfig();
const apolloServer = getApolloServer();

export const graphql = functions.https.onRequest(apolloServer.createHandler());
