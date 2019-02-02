import { ErrorCode } from './ErrorCode';
import ServerError from './ServerError';
import { HttpStatusCode } from '../api/HttpStatusCode';

export default class InternalServerError extends ServerError {
    constructor(message: string) {
        super(message, ErrorCode.INTERNAL_SERVER_ERROR, HttpStatusCode.INTERNAL_SERVER_ERROR_500);
    }
}
