import { runTypeTest } from './typeTestHelper';
import { countryDefinition, countryResolver } from '../countryType';

describe('country type tests', () => {
  runTypeTest({
    name: 'Country',
    typeDefinition: countryDefinition,
    typeResolver: countryResolver,
    inputTests: [
      {
        valid: true,
        queryType: 'Query',
        inputType: 'JSON',
        input: 'AU',
        expected: 'AUSTRALIA'
      },
      {
        valid: true,
        queryType: 'Mutation',
        inputType: 'JSON',
        input: 'AUSTRALIA',
        expected: 'AUSTRALIA'
      },
      {
        valid: true,
        queryType: 'Mutation',
        inputType: 'Literal',
        input: 'AUSTRALIA',
        expected: 'AUSTRALIA'
      },
      {
        valid: false,
        queryType: 'Mutation',
        inputType: 'JSON',
        input: 'no',
        expected: 'no'
      },
      {
        valid: false,
        queryType: 'Mutation',
        inputType: 'Literal',
        input: 'no',
        expected: 'no'
      }
    ]
  });
});
