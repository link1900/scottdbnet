import { runScript } from './scriptHelper';
import logger from '../src/logging/logger';
import { setupDatabaseConnection } from '../src/server/serverHelper';
import { syncSchema } from '../src/database/databaseHelper';

async function main() {
  logger.info('running database connection test');
  const { database, models } = await setupDatabaseConnection();
  const result = await database.query('SELECT NOW() as now');
  logger.info(`found result ${JSON.stringify(result)}`);
  await syncSchema(database);
}

runScript(main);
