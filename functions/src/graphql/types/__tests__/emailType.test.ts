import { emailDefinition, emailResolver } from '../emailType';
import { runTypeTest } from './typeTestHelper';

describe('emailType tests', () => {
  runTypeTest({
    name: 'Email',
    typeDefinition: emailDefinition,
    typeResolver: emailResolver,
    queryResult: 'test@originenergy.com.au',
    mutationResult: 'test@originenergy.com.au',
    inputTests: [
      {
        valid: true,
        queryType: 'Query',
        inputType: 'JSON',
        input: 'test@originenergy.com.au',
        expected: 'test@originenergy.com.au'
      },
      {
        valid: true,
        queryType: 'Mutation',
        inputType: 'JSON',
        input: 'test@originenergy.com.au',
        expected: 'test@originenergy.com.au'
      },
      {
        valid: true,
        queryType: 'Mutation',
        inputType: 'Literal',
        input: '"test@originenergy.com.au"',
        expected: 'test@originenergy.com.au'
      },
      {
        valid: false,
        queryType: 'Mutation',
        inputType: 'JSON',
        input: '@@@',
        expected: '@@@'
      },
      {
        valid: false,
        queryType: 'Mutation',
        inputType: 'Literal',
        input: '"@@@"',
        expected: '@@@'
      }
    ]
  });
});
