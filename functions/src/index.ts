import * as functions from 'firebase-functions';
import { getApolloServer } from './server/cloudFunctionHelper';

const apolloServer = getApolloServer();

export const graphql = functions.https.onRequest(apolloServer.createHandler());
