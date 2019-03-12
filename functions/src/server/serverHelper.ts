import 'reflect-metadata';
import { Connection } from 'typeorm';
import { getVariable, isVariableEnabled } from '../environment/environmentHelper';
import InternalServerError from '../error/InternalServerError';
import { closeConnection, connectToDatabase } from '../database/databaseHelper';
import ServerContext from './ServerContext';
import { createDataLoaders } from './dataLoaders';
import logger from '../logging/logger';
import { get } from 'lodash';
import { Request } from 'express';
import { IncomingHttpHeaders } from 'http';
import { User } from './User';
import * as admin from 'firebase-admin';
import DecodedIdToken = admin.auth.DecodedIdToken;
import { Role } from './Role';

let connection: Connection | undefined = undefined;

export async function getDatabaseConnection(): Promise<Connection> {
  if (connection) {
    return connection;
  }

  const databaseName = getVariable('DATABASE_NAME');
  const username = getVariable('DATABASE_USERNAME');
  const password = getVariable('DATABASE_PASSWORD');
  const host = getVariable('DATABASE_HOST');
  const dropSchema = isVariableEnabled('DATABASE_DROP_ON_START');
  const synchronize = isVariableEnabled('DATABASE_SYNC');
  const logging = isVariableEnabled('DATABASE_LOGGING');

  connection = await connectToDatabase({
    database: databaseName,
    username,
    password,
    host,
    dropSchema,
    synchronize,
    logging
  });

  if (!connection) {
    throw new InternalServerError('Unable to create database connection');
  }

  return connection;
}

export async function closeDatabaseConnection(): Promise<boolean> {
  if (connection) {
    await closeConnection(connection);
    return true;
  }
  return false;
}

export async function createContextFromRequest(req: Request): Promise<ServerContext> {
  const currentConnection = await getDatabaseConnection();
  const loaders = await createDataLoaders(currentConnection);
  // create context
  const serverContext = new ServerContext(loaders);

  // populate with user credentials
  const idToken = await getIdTokenFromHeader(req.headers);
  if (idToken) {
    try {
      serverContext.idToken = idToken;
      const decodedIdToken = await admin.auth().verifyIdToken(idToken);
      logger.trace('ID Token correctly decoded', decodedIdToken);
      serverContext.decodedIdToken = decodedIdToken;
      serverContext.user = getUserFromDecodedIdToken(serverContext.decodedIdToken);
      serverContext.roles = getRolesForUser(serverContext.user);
    } catch (error) {
      logger.error('Error while verifying ID Token:', error);
    }
  }
  return serverContext;
}

export async function getIdTokenFromHeader(headers: IncomingHttpHeaders): Promise<string | undefined> {
  if (headers.authorization && headers.authorization.startsWith('Bearer ')) {
    logger.trace('Found Authorization header');
    return headers.authorization.split('Bearer ')[1];
  }

  return undefined;
}

export function getUserFromDecodedIdToken(decodedIdToken: DecodedIdToken): User {
  return {
    id: decodedIdToken.user_id,
    name: decodedIdToken.name,
    email: decodedIdToken.email,
    imageUrl: decodedIdToken.picture
  };
}

export function getRolesForUser(user: User): Role[] {
  if (user.id) {
    return [Role.ADMIN, Role.USER];
  }

  return [];
}
