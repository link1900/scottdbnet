import InternalServerError from '../error/InternalServerError';

export enum ExecutionEnvironment {
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

export function setVariable(envVarName: string, envVarValue: string, allowOverride: boolean = false): boolean {
  if (allowOverride || !process.env[envVarName]) {
    process.env[envVarName] = envVarValue;
    return true;
  }
  return false;
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
