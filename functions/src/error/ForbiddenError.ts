import { ErrorCode } from './ErrorCode';
import ServerError from './ServerError';
import { HttpStatusCode } from '../api/HttpStatusCode';

export default class ForbiddenError extends ServerError {
  constructor(message: string) {
    super(message, ErrorCode.FORBIDDEN_ERROR, HttpStatusCode.FORBIDDEN_403);
  }
}
