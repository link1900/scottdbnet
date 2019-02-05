import Sequelize, { Sequelize as Seq, Model, Instance } from 'sequelize';
import logger from '../logging/logger';
import { BaseAttributes, DatabaseConnection, TableSchemaDefinition } from './databaseTypes';

export async function connectToDatabase(databaseConnection: DatabaseConnection): Promise<Seq | undefined> {
  try {
    logger.info(`connecting to database ${databaseConnection.database}`);
    const sequelize = new Sequelize(
      databaseConnection.database,
      databaseConnection.username,
      databaseConnection.password,
      databaseConnection.options
    );

    // log on to database
    await sequelize.authenticate();
    logger.info(`connected to database ${databaseConnection.database}`);

    return sequelize;
  } catch (e) {
    logger.error(`error connecting to database ${databaseConnection.database}`, {}, e);
    return undefined;
  }
}

export async function createModel<ModelInstance extends Instance<BaseAttributes>>(
  sequelize: Seq,
  schemaDef: TableSchemaDefinition<ModelInstance>
): Promise<Model<ModelInstance, BaseAttributes>> {
  const model = await sequelize.define<ModelInstance, any>(schemaDef.name, schemaDef.fields, schemaDef.options);
  return (model as any) as Model<ModelInstance, any>;
}

export async function syncSchema(sequelize: Seq) {
  logger.info('syncing database schema');
  return sequelize.sync();
}
