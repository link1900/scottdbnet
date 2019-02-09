import { runTypeTest } from './typeTestHelper';
import { percentDefinition, percentResolver } from '../percentType';

describe('percent type tests', () => {
  runTypeTest({
    name: 'Percent',
    typeDefinition: percentDefinition,
    typeResolver: percentResolver,
    inputTests: [
      {
        valid: true,
        queryType: 'Query',
        inputType: 'JSON',
        input: 0.5,
        expected: 0.5
      },
      {
        valid: true,
        queryType: 'Mutation',
        inputType: 'JSON',
        input: 0.5,
        expected: 0.5
      },
      {
        valid: true,
        queryType: 'Mutation',
        inputType: 'JSON',
        input: 1,
        expected: 1
      },
      {
        valid: true,
        queryType: 'Mutation',
        inputType: 'JSON',
        input: 0,
        expected: 0
      },
      {
        valid: true,
        queryType: 'Mutation',
        inputType: 'Literal',
        input: '0.5',
        expected: 0.5
      },
      {
        valid: false,
        queryType: 'Mutation',
        inputType: 'JSON',
        input: 6
      },
      {
        valid: false,
        queryType: 'Mutation',
        inputType: 'Literal',
        input: '6'
      },
      {
        valid: false,
        queryType: 'Mutation',
        inputType: 'JSON',
        input: '6'
      },
      {
        valid: false,
        queryType: 'Mutation',
        inputType: 'Literal',
        input: '"6"'
      }
    ]
  });
});
