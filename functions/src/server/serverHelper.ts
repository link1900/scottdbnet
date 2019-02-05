import { getVariable } from '../environment/environmentHelper';
import InternalServerError from '../error/InternalServerError';
import { connectToDatabase } from '../database/databaseHelper';
import { Sequelize as Seq } from 'sequelize';
import { createModels, DatabaseModels } from './databaseModels';

let database: Seq | undefined;
let models: DatabaseModels | undefined;

export async function setupDatabaseConnection(): Promise<{ database: Seq; models: DatabaseModels }> {
  if (database && models) {
    return {
      database,
      models
    };
  }

  const databaseName = getVariable('DATABASE_NAME');
  const username = getVariable('DATABASE_USERNAME');
  const password = getVariable('DATABASE_PASSWORD');
  const host = getVariable('DATABASE_HOST');

  database = await connectToDatabase({
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

  models = await createModels(database);

  return {
    database,
    models
  };
}
