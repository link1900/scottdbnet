import queryString from 'query-string';
import InternalServerError from '../error/InternalServerError';
import { isString } from 'lodash';

export function buildUrl(url: string, queryParameters = {}): string {
    if (!isString(url)) {
        throw new InternalServerError(`Cannot build url for invalid url of '${url}'`);
    }
    let urlString = encodeURI(url);
    const paramString = queryParameters ? queryString.stringify(queryParameters) : '';
    if (paramString.length > 0) {
        urlString = `${urlString}?${paramString}`;
    }
    return `${urlString}#/calculator`;
}
