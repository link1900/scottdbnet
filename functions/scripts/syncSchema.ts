import { runScript } from './scriptHelper';
import logger from '../src/logging/logger';
import { setupDatabaseConnection } from '../src/server/serverHelper';
import { syncSchema } from '../src/database/databaseHelper';

async function main() {
  logger.info('running database schema sync');
  const { database } = await setupDatabaseConnection();
  await syncSchema(database);
}

runScript(main);
