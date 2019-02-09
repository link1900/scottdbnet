import { runTypeTest } from './typeTestHelper';
import { phoneDefinition, phoneResolver } from '../phoneType';

describe('phone type tests', () => {
  runTypeTest({
    name: 'Phone',
    typeDefinition: phoneDefinition,
    typeResolver: phoneResolver,
    inputTests: [
      {
        valid: true,
        queryType: 'Query',
        inputType: 'JSON',
        input: '0397981111',
        expected: '0397981111'
      },
      {
        valid: true,
        queryType: 'Mutation',
        inputType: 'JSON',
        input: '0397981111',
        expected: '0397981111'
      },
      {
        valid: true,
        queryType: 'Mutation',
        inputType: 'Literal',
        input: '"0397981111"',
        expected: '0397981111'
      },
      {
        valid: false,
        queryType: 'Mutation',
        inputType: 'JSON',
        input: '1'
      },
      {
        valid: false,
        queryType: 'Mutation',
        inputType: 'Literal',
        input: '"1"'
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
      }
    ]
  });
});
