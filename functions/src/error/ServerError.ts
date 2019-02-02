import { ErrorCode } from './ErrorCode';
import { HttpStatusCode } from '../api/HttpStatusCode';

export default class ServerError extends Error {
    public code: ErrorCode;
    public httpCode: HttpStatusCode;

    constructor(message: string, code: ErrorCode, httpCode: HttpStatusCode) {
        super(message);
        this.code = code;
        this.httpCode = httpCode;
    }
}
