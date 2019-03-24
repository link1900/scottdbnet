import * as functions from 'firebase-functions';
import { getApolloServer } from './server/cloudFunctionHelper';
import { getVariable, loadEnvironmentVariablesFromConfig } from './environment/environmentHelper';
import logger from './logging/logger';

process.env.EXECUTION_ENVIRONMENT = functions.config().core.executionenvironment;
loadEnvironmentVariablesFromConfig();
logger.logLevel = getVariable('LOG_LEVEL');
const apolloServer = getApolloServer();

export const graphql = functions.https.onRequest(apolloServer.createHandler());
