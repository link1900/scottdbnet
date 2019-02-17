import { createConnection, Connection, EntityMetadata } from 'typeorm';
import logger from '../logging/logger';
import { Greyhound } from '../ranker/greyhound/Greyhound';
import InternalServerError from '../error/InternalServerError';
import { Race } from '../ranker/race/Race';
import { Placing } from '../ranker/placing/Placing';
import { Score } from '../ranker/score/Score';

export type DatabaseConnection = {
  database: string;
  username: string;
  password: string;
  host: string;
  dropSchema: boolean;
  synchronize: boolean;
  logging: boolean;
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
      entities: [Greyhound, Race, Placing, Score]
    });

    logger.info(`connected to database ${databaseConnection.database}`);

    return connection;
  } catch (e) {
    logger.error(`error connecting to database ${databaseConnection.database}`, {}, e);
    return undefined;
  }
}

export async function closeConnection(connection: Connection) {
  logger.info(`closing connection to database`);
  if (connection.isConnected) {
    await connection.close();
  }
}
