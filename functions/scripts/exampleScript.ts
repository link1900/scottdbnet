import { runScript } from './scriptHelper';
import logger from '../src/logging/logger';

async function main() {
  logger.info('running example script');
}

runScript(main);
