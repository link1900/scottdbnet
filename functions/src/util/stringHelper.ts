import { isArray, isString, isEmpty, isObject } from 'lodash';

export { isString };

export function arrayToString(fields: Array<string | null | undefined> = [], separator: string = ' ') {
    if (!isArray(fields)) {
        return '';
    }
    return fields
        .filter(x => isString(x))
        .map(field => field && field.trim())
        .filter(x => !isEmpty(x))
        .join(separator)
        .trim();
}

export function filterForOnlyLetters(value?: string, regex?: string | RegExp): string {
    if (!value) {
        return '';
    }

    return value.replace(/[^a-zA-Z\s]/g, '');
}

export function objectToString(object: any) {
    if (!isObject(object)) {
        return '';
    }

    try {
        return JSON.stringify(object);
    } catch (error) {
        return '';
    }
}
