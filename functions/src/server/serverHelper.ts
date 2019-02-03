import { getVariable } from '../environment/environmentHelper';
import InternalServerError from '../error/InternalServerError';
import databaseSchema from './databaseSchema';
import { connectToDatabase, defineDatabaseModels } from '../database/databaseHelper';
import { Sequelize as Seq } from 'sequelize';

export async function setupDatabaseConnection(): Promise<{ database: Seq; models: any[] }> {
  const databaseName = getVariable('DATABASE_NAME');
  const username = getVariable('DATABASE_USERNAME');
  const password = getVariable('DATABASE_PASSWORD');
  const host = getVariable('DATABASE_HOST');

  const database = await connectToDatabase({
    database: databaseName,
    username,
    password,
    options: {
      host,
      dialect: 'postgres',
      operatorsAliases: false,
      pool: {
        max: 1
      }
    }
  });

  if (!database) {
    throw new InternalServerError('Unable to create database connection');
  }

  const models = await defineDatabaseModels(database, databaseSchema);

  return {
    database,
    models
  };
}
