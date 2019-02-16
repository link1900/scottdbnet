import { arrayToString, base64Decode, base64Encode, filterForOnlyLetters, objectToString } from '../stringHelper';

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
});
