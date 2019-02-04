import { getVariable } from '../environment/environmentHelper';
import InternalServerError from '../error/InternalServerError';
import { connectToDatabase } from '../database/databaseHelper';
import { Sequelize as Seq } from 'sequelize';
import { createModels, DatabaseModels } from './databaseModels';

export async function setupDatabaseConnection(): Promise<{ database: Seq; models: DatabaseModels }> {
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

  const models = await createModels(database);

  return {
    database,
    models
  };
}
