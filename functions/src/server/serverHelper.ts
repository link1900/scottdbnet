import 'reflect-metadata';
import { getVariable } from '../environment/environmentHelper';
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

  connection = await connectToDatabase({
    database: databaseName,
    username,
    password,
    host
  });

  if (!connection) {
    throw new InternalServerError('Unable to create database connection');
  }

  return connection;
}

export async function closeDatabaseConnection() {
  if (connection) {
    return await closeConnection(connection);
  }
  return false;
}
