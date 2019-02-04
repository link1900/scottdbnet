import Sequelize, { Sequelize as Seq, Model } from 'sequelize';
import logger from '../logging/logger';
import { DatabaseConnection, TableSchemaDefinition } from './databaseTypes';

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

export async function createModel<T>(sequelize: Seq, schemaDef: TableSchemaDefinition<T>): Promise<Model<T, any>> {
  const model = await sequelize.define<T, any>(schemaDef.name, schemaDef.fields, schemaDef.options);

  return (model as any) as Model<T, any>;
}

export async function syncSchema(sequelize: Seq) {
  logger.info('syncing database schema');
  return sequelize.sync();
}
