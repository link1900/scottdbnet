import { runTypeTest } from './typeTestHelper';
import { textFieldDefinition, textFieldResolver } from '../textFieldType';

describe('text field type tests', () => {
  runTypeTest({
    name: 'TextField',
    typeDefinition: textFieldDefinition,
    typeResolver: textFieldResolver,
    inputTests: [
      {
        valid: true,
        queryType: 'Query',
        inputType: 'JSON',
        input: 'some text',
        expected: 'some text'
      },
      {
        valid: true,
        queryType: 'Query',
        inputType: 'JSON',
        input: 5,
        expected: '5'
      },
      {
        valid: true,
        queryType: 'Query',
        inputType: 'JSON',
        input: { test: 'object' },
        expected: '[object Object]'
      },
      {
        valid: true,
        queryType: 'Query',
        inputType: 'JSON',
        input: Object.create(null),
        expected: null
      },
      {
        valid: true,
        queryType: 'Mutation',
        inputType: 'JSON',
        input: 'some text',
        expected: 'some text'
      },
      {
        valid: true,
        queryType: 'Mutation',
        inputType: 'Literal',
        input: '"some text"',
        expected: 'some text'
      },
      {
        valid: false,
        queryType: 'Mutation',
        inputType: 'JSON',
        input: 1
      },
      {
        valid: false,
        queryType: 'Mutation',
        inputType: 'Literal',
        input: '1'
      },
      {
        valid: false,
        queryType: 'Mutation',
        inputType: 'JSON',
        input:
          '0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890'
      },
      {
        valid: false,
        queryType: 'Mutation',
        inputType: 'Literal',
        input:
          '"0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890"'
      }
    ]
  });
});
