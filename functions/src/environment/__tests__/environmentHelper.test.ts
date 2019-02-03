import {
  ExecutionEnvironment,
  getExecutionEnvironment,
  getVariable,
  getVariableAsInteger,
  isVariableEnabled,
  setVariable
} from '../environmentHelper';
import { ErrorCode } from '../../error/ErrorCode';

describe('environmentHelper', () => {
  afterAll(() => {
    process.env.EXECUTION_ENVIRONMENT = ExecutionEnvironment.LOCAL_TEST;
  });

  describe('#getVariable', () => {
    it('returns env var correctly', () => {
      process.env.TEMP_TEST_VAR = '123';
      const result = getVariable('TEMP_TEST_VAR');
      expect(result).toEqual('123');
    });

    it('returns default value when supplied', () => {
      const result = getVariable('TEMP_TEST_VAR1', 'defaultValue');
      expect(result).toEqual('defaultValue');
    });

    it('returns with error when var is not found', () => {
      try {
        getVariable('TEMP_TEST_VAR1');
        expect(false).toEqual(true);
      } catch (error) {
        expect(error.code).toEqual(ErrorCode.INTERNAL_SERVER_ERROR);
      }
    });
  });

  describe('#getVariableAsInteger', () => {
    it('returns env var correctly as number', () => {
      process.env.TEMP_TEST_VAR_NUM = '666';
      const result = getVariableAsInteger('TEMP_TEST_VAR_NUM');
      expect(result).toEqual(666);
    });

    it('returns default value when supplied', () => {
      process.env.TEMP_TEST_VAR_NUM_BAD = 'not a number';

      try {
        getVariableAsInteger('TEMP_TEST_VAR_NUM_BAD');
        expect(false).toEqual(true);
      } catch (error) {
        expect(error.code).toEqual(ErrorCode.INTERNAL_SERVER_ERROR);
      }
    });

    it('returns with error when var is not found', () => {
      try {
        getVariableAsInteger('TEMP_TEST_VAR1');
        expect(false).toEqual(true);
      } catch (error) {
        expect(error.code).toEqual(ErrorCode.INTERNAL_SERVER_ERROR);
      }
    });
  });

  describe('#isVariableEnabled', () => {
    it('is true when set to true string', () => {
      process.env.TEMP_TEST_VAR_BOOLEAN = 'true';
      const result = isVariableEnabled('TEMP_TEST_VAR_BOOLEAN');
      expect(result).toEqual(true);
    });

    it('is true when set to  True string', () => {
      process.env.TEMP_TEST_VAR_BOOLEAN = ' True';
      const result = isVariableEnabled('TEMP_TEST_VAR_BOOLEAN');
      expect(result).toEqual(true);
    });

    it('is false when not set', () => {
      const result = isVariableEnabled('TEMP_TEST_VAR_BOOLEAN_OTHER');
      expect(result).toEqual(false);
    });

    it('is false when set to false string', () => {
      process.env.TEMP_TEST_VAR_BOOLEAN = 'false';
      const result = isVariableEnabled('TEMP_TEST_VAR_BOOLEAN');
      expect(result).toEqual(false);
    });

    it('is false when set null', () => {
      process.env.TEMP_TEST_VAR_BOOLEAN = undefined;
      const result = isVariableEnabled('TEMP_TEST_VAR_BOOLEAN');
      expect(result).toEqual(false);
    });

    it('is false when set to blank string', () => {
      process.env.TEMP_TEST_VAR_BOOLEAN = '';
      const result = isVariableEnabled('TEMP_TEST_VAR_BOOLEAN');
      expect(result).toEqual(false);
    });
  });

  describe('#setVariable', () => {
    it('sets the environment variable when one is not already set', () => {
      const result = setVariable('TEMP_TEST_SET_VAR', '123');
      expect(result).toEqual(true);
      expect(process.env.TEMP_TEST_SET_VAR).toEqual('123');
    });

    it('does not set the environment variable when one is already set', () => {
      process.env.TEMP_TEST_SET_VAR = '456';
      const result = setVariable('TEMP_TEST_SET_VAR', '789');
      expect(result).toEqual(false);
      expect(process.env.TEMP_TEST_SET_VAR).toEqual('456');
    });

    it('sets the environment variable when one is already set when override is true', () => {
      process.env.TEMP_TEST_SET_VAR = '456';
      const result = setVariable('TEMP_TEST_SET_VAR', '789', true);
      expect(result).toEqual(true);
      expect(process.env.TEMP_TEST_SET_VAR).toEqual('789');
    });
  });

  describe('#getExecutionEnvironment', () => {
    const testCases = [
      { value: 'local-test', expected: ExecutionEnvironment.LOCAL_TEST },
      { value: 'local-dev', expected: ExecutionEnvironment.LOCAL_DEV },
      { value: 'dev', expected: ExecutionEnvironment.DEV },
      { value: 'test', expected: ExecutionEnvironment.TEST },
      { value: 'staging', expected: ExecutionEnvironment.STAGING },
      { value: 'production', expected: ExecutionEnvironment.PRODUCTION }
    ];

    afterEach(() => {
      process.env.EXECUTION_ENVIRONMENT = 'local-test';
    });

    testCases.forEach(testCase => {
      it(`gets the execution environment ${testCase.expected} for value '${testCase.value}'`, () => {
        process.env.EXECUTION_ENVIRONMENT = testCase.value;
        expect(getExecutionEnvironment()).toEqual(testCase.expected);
      });
    });
  });
});
