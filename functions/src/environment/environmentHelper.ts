import InternalServerError from '../error/InternalServerError';
import logger from '../logging/logger';

export enum ExecutionEnvironment {
  BASE = 'base',
  LOCAL_TEST = 'local-test',
  LOCAL_DEV = 'local-dev',
  DEV = 'dev',
  TEST = 'test',
  STAGING = 'staging',
  PRODUCTION = 'production'
}

export enum EnvironmentVariable {
  EXECUTION_ENVIRONMENT = 'EXECUTION_ENVIRONMENT'
}

export function findVariable(key: string): string | undefined {
  return process.env[key];
}

export function getVariable(key: string, defaultValue?: string): string {
  const envVar = findVariable(key);
  if (!envVar) {
    if (defaultValue) {
      return defaultValue;
    }
    throw new InternalServerError(`Environment variable ${key} was not found`);
  }
  return envVar;
}

export function getVariableAsInteger(key: string): number {
  const stringValue = getVariable(key);
  const result = parseInt(stringValue, 10);
  if (!Number.isInteger(result)) {
    throw new InternalServerError(`Environment variable ${key} was not a valid integer`);
  }
  return result;
}

export function isVariableEnabled(key: string): boolean {
  try {
    const result = getVariable(key);
    return result.trim().toLowerCase() === 'true';
  } catch (err) {
    return false;
  }
}

export function setVariable(envVarName: string, envVarValue: string, disableOverride: boolean = false): boolean {
  if (process.env[envVarName] !== undefined && disableOverride === true) {
    return false;
  }

  process.env[envVarName] = envVarValue;
  return true;
}

export function getExecutionEnvironment(): ExecutionEnvironment {
  const executionEnvironment = findVariable(EnvironmentVariable.EXECUTION_ENVIRONMENT);

  switch (executionEnvironment) {
    case ExecutionEnvironment.LOCAL_TEST:
      return ExecutionEnvironment.LOCAL_TEST;
    case ExecutionEnvironment.LOCAL_DEV:
      return ExecutionEnvironment.LOCAL_DEV;
    case ExecutionEnvironment.DEV:
      return ExecutionEnvironment.DEV;
    case ExecutionEnvironment.TEST:
      return ExecutionEnvironment.TEST;
    case ExecutionEnvironment.STAGING:
      return ExecutionEnvironment.STAGING;
    case ExecutionEnvironment.PRODUCTION:
      return ExecutionEnvironment.PRODUCTION;
    default:
      return ExecutionEnvironment.LOCAL_DEV;
  }
}

export function loadConfigFile(environment: string): boolean {
  const fileToLoad = `../config/env-${environment}.json`;
  try {
    const configToLoad = require(fileToLoad);
    logger.trace(`Loading environment variables from config file ${fileToLoad}`);
    Object.keys(configToLoad).forEach(key => {
      setVariable(key, configToLoad[key]);
    });
    return true;
  } catch (error) {
    logger.warn(`Unable to load config file ${fileToLoad}`);
    return false;
  }
}

export function loadEnvironmentVariablesFromConfig() {
  const executionEnvironment = getExecutionEnvironment();
  logger.info(`Loading environment variables for environment ${executionEnvironment}`);
  loadConfigFile(ExecutionEnvironment.BASE);
  if (executionEnvironment) {
    loadConfigFile(executionEnvironment);
  }
}
