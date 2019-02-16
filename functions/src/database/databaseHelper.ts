import { createConnection, Connection, EntityMetadata } from 'typeorm';
import logger from '../logging/logger';
import { Greyhound } from '../ranker/greyhound/Greyhound';
import InternalServerError from '../error/InternalServerError';

export type DatabaseConnection = {
  database: string;
  username: string;
  password: string;
  host: string;
};

export async function connectToDatabase(databaseConnection: DatabaseConnection): Promise<Connection | undefined> {
  try {
    logger.info(`connecting to database ${databaseConnection.database}`);
    const connection = await createConnection({
      type: 'postgres',
      ...databaseConnection,
      extra: {
        pool: {
          max: 1
        }
      },
      entities: [Greyhound],
      synchronize: true,
      logging: false
    });

    logger.info(`connected to database ${databaseConnection.database}`);

    return connection;
  } catch (e) {
    logger.error(`error connecting to database ${databaseConnection.database}`, {}, e);
    return undefined;
  }
}

export async function closeConnection(connection: Connection) {
  if (connection.isConnected) {
    await connection.close();
  }
}

export function getEntities(connection: Connection): EntityMetadata[] {
  return connection.entityMetadatas;
}

export async function clearAllEntities(connection: Connection) {
  const entities = getEntities(connection);
  try {
    await Promise.all(
      entities.map(entity => {
        return connection.query(`DELETE FROM ${entity.tableName};`);
      })
    );
  } catch (error) {
    throw new InternalServerError(`ERROR: Cleaning test db: ${error}`);
  }
}
