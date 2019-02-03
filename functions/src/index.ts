import * as functions from 'firebase-functions';
import { getApolloServer } from './server/serverHelper';

export const graphql = functions.https.onRequest(getApolloServer().createHandler());
