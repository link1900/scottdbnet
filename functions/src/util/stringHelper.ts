import { isArray, isString, isEmpty, isObject } from 'lodash';

export { isString };

export function arrayToString(fields: Array<string | null | undefined> = [], separator: string = ' '): string {
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

export function objectToString(object: any): string {
  if (!isObject(object)) {
    return '';
  }

  return JSON.stringify(object);
}

export function base64Encode(text?: string): string {
  if (!isString(text)) {
    return '';
  }
  return Buffer.from(text, 'ascii').toString('base64');
}

export function base64Decode(text?: string): string {
  if (!isString(text)) {
    return '';
  }
  return Buffer.from(text, 'base64').toString('ascii');
}
