import { ErrorCode } from './ErrorCode';
import ServerError from './ServerError';
import { HttpStatusCode } from '../api/HttpStatusCode';

export default class NotFoundError extends ServerError {
  constructor(message: string) {
    super(message, ErrorCode.NOT_FOUND, HttpStatusCode.NOT_FOUND_404);
  }
}
