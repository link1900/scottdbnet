import Sequelize, { Sequelize as Seq } from 'sequelize';
import logger from '../logging/logger';
import { DatabaseConnection, DatabaseSchemaDefinition } from './databaseTypes';

export async function connectToDatabase(databaseConnection: DatabaseConnection): Promise<Seq | undefined> {
  try {
    logger.info('connecting to database');
    const sequelize = new Sequelize(
      databaseConnection.database,
      databaseConnection.username,
      databaseConnection.password,
      databaseConnection.options
    );

    // log on to database
    await sequelize.authenticate();
    logger.info('connected to database');

    return sequelize;
  } catch (e) {
    logger.error('error connecting to database', {}, e);
    return undefined;
  }
}

export async function defineDatabaseModels(sequelize: Seq, schemaDefinition: DatabaseSchemaDefinition): Promise<any[]> {
  return Promise.all(
    Object.keys(schemaDefinition).map(tableName => {
      const definition = schemaDefinition[tableName];
      return sequelize.define(tableName, definition);
    })
  );
}

export async function syncSchema(sequelize: Seq) {
  logger.info('syncing database schema');
  return sequelize.sync();
}
