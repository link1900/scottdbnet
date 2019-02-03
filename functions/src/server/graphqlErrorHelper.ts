import UserInputError from '../error/UserInputError';
import ServerError from '../error/ServerError';
import { ErrorCode } from '../error/ErrorCode';
import logger from '../logging/logger';

export interface GraphqlErrorExtension {
  code: ErrorCode;
  invalidField?: string;
  invalidReason?: string;
  stacktrace?: string;
}

export function getGraphqlErrorExtensionForError(error: any): GraphqlErrorExtension {
  if (error instanceof UserInputError) {
    return {
      code: error.code,
      invalidField: error.invalidField,
      invalidReason: error.invalidReason,
      stacktrace: error.stack
    };
  }

  if (error instanceof ServerError) {
    return {
      code: error.code,
      stacktrace: error.stack
    };
  }

  if (error instanceof Error) {
    return {
      code: ErrorCode.INTERNAL_SERVER_ERROR,
      stacktrace: error.stack
    };
  }

  return {
    code: ErrorCode.INTERNAL_SERVER_ERROR
  };
}

export function getMaskedErrorMessageForCode(message: string, code: ErrorCode) {
  switch (code) {
    case ErrorCode.INTERNAL_SERVER_ERROR:
      return 'There was an unexpected error';
    case ErrorCode.USER_INPUT_ERROR:
      return message;
  }
}

export function handleGraphqlError(graphqlError: any): any {
  const { originalError, message, locations, path } = graphqlError;

  // log the error
  logger.error('graphql error', {}, originalError);

  // format the error to the error standard
  return {
    message,
    locations,
    path,
    extensions: getGraphqlErrorExtensionForError(originalError)
  };
}
