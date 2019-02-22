import {
  anyToString,
  arrayToString,
  base64Decode,
  base64Encode,
  deserializeFromString,
  filterForOnlyLetters,
  getHash,
  getHashForString,
  isString,
  objectToString,
  serializeToString,
  stringToAny,
  unzipStringToString,
  zipStringToString
} from '../stringHelper';
import exampleJson from './exampleJson.json';

describe('stringHelper', () => {
  describe('#arrayToString', () => {
    const testCases = [
      { value: ['val1', null, 'val3'], option: undefined, expected: 'val1 val3' },
      { value: [null, 'val3'], option: undefined, expected: 'val3' },
      { value: ['val1', null, 'val3'], option: '-', expected: 'val1-val3' },
      { value: 'something', option: undefined, expected: '' },
      { value: undefined, option: undefined, expected: '' }
    ];

    testCases.forEach(testCase => {
      it(`combines strings '${testCase.value}' to be ${testCase.expected} for options ${JSON.stringify(
        testCase.option
      )}`, () => {
        // @ts-ignore
        expect(arrayToString(testCase.value, testCase.option)).toEqual(testCase.expected);
      });
    });
  });

  describe('#filterForOnlyLetters', () => {
    const testCases = [
      { value: 'val1', expected: 'val' },
      { value: 'Hey There', expected: 'Hey There' },
      { value: '!@#$%^&*()_+=-yes', expected: 'yes' },
      { value: undefined, expected: '' }
    ];

    testCases.forEach(testCase => {
      it(`filter string '${testCase.value}' to be ${testCase.expected}`, () => {
        expect(filterForOnlyLetters(testCase.value)).toEqual(testCase.expected);
      });
    });
  });

  describe('#objectToString', () => {
    it('converts an object to a string', () => {
      expect(objectToString({ test: 'object' })).toEqual('{"test":"object"}');
      expect(objectToString(null)).toEqual('');
      // @ts-ignore
      expect(objectToString()).toEqual('');
      expect(objectToString('invalid')).toEqual('');
    });
  });

  describe('#base64Encode', () => {
    it('encodes correctly', () => {
      const text = 'someType|90543609845670834';
      const expected = 'c29tZVR5cGV8OTA1NDM2MDk4NDU2NzA4MzQ=';
      expect(base64Encode(text)).toEqual(expected);
    });

    it('can base64 encode a piece of text', () => {
      const input = 'Hello World';
      const expected = 'SGVsbG8gV29ybGQ=';
      expect(base64Encode(input)).toEqual(expected);
    });

    it('can base64 encode null', () => {
      const input = null;
      // @ts-ignore
      expect(base64Encode(input)).toEqual('');
    });

    it('can base64 encode undefined', () => {
      const input = undefined;
      expect(base64Encode(input)).toEqual('');
    });
  });

  describe('#base64Decode', () => {
    it('decodes correctly', () => {
      const text = 'c29tZVR5cGV8OTA1NDM2MDk4NDU2NzA4MzQ=';
      const expected = 'someType|90543609845670834';
      expect(base64Decode(text)).toEqual(expected);
    });

    it('can base64 decode a piece of text', () => {
      const input = 'SGVsbG8gV29ybGQ=';
      const expected = 'Hello World';
      expect(base64Decode(input)).toEqual(expected);
    });

    it('can base64 encode null', () => {
      const input = null;
      // @ts-ignore
      expect(base64Decode(input)).toEqual('');
    });

    it('can base64 encode undefined', () => {
      const input = undefined;
      expect(base64Decode(input)).toEqual('');
    });
  });

  describe('#getHashForString', () => {
    it('get a hash of a string', () => {
      const result = getHashForString('someString');
      expect(result).not.toEqual('someString');
    });
  });

  describe('#getHash', () => {
    const inputs = [
      { value: 'Scott Brown' },
      { value: null },
      { value: { test: 'object' } },
      { value: ['value1', 'value2'] }
    ];

    inputs.forEach(input => {
      it(`converts value ${input.value} to hash string`, () => {
        const hash1 = getHash(input.value);
        const hash2 = getHash(input.value);
        expect(hash1.length > 0).toEqual(true);
        expect(hash1).toEqual(hash2);
      });
    });
  });

  describe('#anyToString and #stringToAny', () => {
    const inputs = [
      { value: 'Scott Brown', expected: '{"value":"Scott Brown"}' },
      { value: null, expected: '{"value":null}' },
      { value: undefined, expected: '{}' },
      { value: { test: 'object' }, expected: '{"value":{"test":"object"}}' },
      { value: ['value1', 'value2'], expected: '{"value":["value1","value2"]}' }
    ];

    inputs.forEach(input => {
      it(`converts value ${input.value} to string ${input.expected}`, () => {
        const stringResult = anyToString(input.value);
        expect(stringResult).toEqual(input.expected);
        expect(stringToAny(stringResult)).toEqual(input.value);
      });
    });
  });

  describe('#zipStringToString and #unzipStringToString', () => {
    it('zips the string correctly', async () => {
      const bigString = JSON.stringify(exampleJson);
      const zipResult = await zipStringToString(bigString);
      expect(zipResult.length < bigString.length).toEqual(true);
      const unzipResult = await unzipStringToString(zipResult);
      expect(unzipResult).toEqual(bigString);
    });
  });

  describe('#serializeToString and #deserializeFromString', () => {
    it('serialize the object to string correctly and then deserialize back to object', async () => {
      const bigObject = exampleJson;
      const sResult = await serializeToString(bigObject);
      expect(isString(sResult)).toEqual(true);
      const dsResult = await deserializeFromString(sResult);
      expect(dsResult).toEqual(bigObject);
    });
  });
});
