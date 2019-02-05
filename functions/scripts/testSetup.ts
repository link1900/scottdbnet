import { loadEnvironmentVariablesFromConfig } from '../src/environment/environmentHelper';

export async function testSetup() {
  process.env.EXECUTION_ENVIRONMENT = 'local-test';
  loadEnvironmentVariablesFromConfig();
}
