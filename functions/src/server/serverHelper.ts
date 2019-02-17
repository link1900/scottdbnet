import 'reflect-metadata';
import { getVariable, isVariableEnabled } from '../environment/environmentHelper';
import InternalServerError from '../error/InternalServerError';
import { closeConnection, connectToDatabase } from '../database/databaseHelper';
import { Connection } from 'typeorm';

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
