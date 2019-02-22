import { isArray, isString, isEmpty, isObject, isNil } from 'lodash';
import zlib from 'zlib';
import crypto from 'crypto';

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

export function stringToObject(string: string): any {
  try {
    const result = JSON.parse(string);
    if (!result) {
      return null;
    }
    return result;
  } catch (error) {
    return null;
  }
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

export function getHashForString(string: string): string {
  return crypto
    .createHash('sha1')
    .update(string)
    .digest('base64');
}

export function getHash(something: any): string {
  return getHashForString(anyToString(something));
}

export function anyToString(value: any): string {
  try {
    return JSON.stringify({
      value
    });
  } catch (error) {
    return '';
  }
}

export function stringToAny(string: string): any {
  try {
    const result = JSON.parse(string);
    if (result === undefined || result === null || result.value === undefined) {
      return undefined;
    }
    return result.value;
  } catch (error) {
    return undefined;
  }
}

export async function zipStringToString(string: string): Promise<string> {
  return new Promise((resolve, reject) => {
    zlib.gzip(string, (err, buffer: Buffer) => {
      if (err) {
        return reject(err);
      }
      return resolve(buffer.toString('base64'));
    });
  });
}

export async function unzipStringToString(zipString: string): Promise<string> {
  return new Promise((resolve, reject) => {
    zlib.gunzip(new Buffer(zipString, 'base64'), (err, buffer) => {
      if (err) {
        return reject(err);
      }
      return resolve(buffer.toString());
    });
  });
}

export async function serializeToString(something: any): Promise<string> {
  return zipStringToString(anyToString(something));
}

export async function deserializeFromString(string: string): Promise<any> {
  if (!isString(string)) {
    return undefined;
  }
  const unzippedString = await unzipStringToString(string);
  return stringToAny(unzippedString);
}
