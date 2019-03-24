import { getVariable, loadEnvironmentVariablesFromConfig } from '../src/environment/environmentHelper';
import logger from '../src/logging/logger';

export async function testSetup() {
  console.log('Running global test setup');
  process.env.EXECUTION_ENVIRONMENT = 'local-test';
  logger.enabled = false;
  loadEnvironmentVariablesFromConfig();
  logger.logLevel = getVariable('LOG_LEVEL');
}
