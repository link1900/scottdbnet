import { unwrap, exists } from '../objectHelper';

describe('objectHelper', () => {
  describe('#unwrap', () => {
    it(`unwraps maybe value something to value something`, () => {
      expect(unwrap('something')).toEqual('something');
    });

    it(`throw an exception when null`, () => {
      expect(() => unwrap(null)).toThrowErrorMatchingSnapshot();
    });

    it(`throw an exception when undefined`, () => {
      expect(() => unwrap(undefined)).toThrowErrorMatchingSnapshot();
    });
  });

  describe('#exists', () => {
    const testCases = [
      { value: 'val1', expected: true },
      { value: { some: 'object' }, expected: true },
      { value: undefined, expected: false },
      { value: null, expected: false }
    ];

    testCases.forEach(testCase => {
      it(`exists find '${testCase.value}' to be ${testCase.expected}`, () => {
        expect(exists(testCase.value)).toEqual(testCase.expected);
      });
    });
  });
});
