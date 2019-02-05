import { loadEnvironmentVariablesFromConfig } from '../src/environment/environmentHelper';

process.env.EXECUTION_ENVIRONMENT = 'local-test';
loadEnvironmentVariablesFromConfig();
