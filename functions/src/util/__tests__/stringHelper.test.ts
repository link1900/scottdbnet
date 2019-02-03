import { arrayToString, filterForOnlyLetters, objectToString } from '../stringHelper';

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
});
