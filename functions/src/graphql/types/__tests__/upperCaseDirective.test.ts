import { runTypeTest } from './typeTestHelper';
import { textFieldDefinition, textFieldResolver } from '../textFieldType';
import { upperCaseDefinition, UpperCaseDirective } from '../upperCaseDirective';

describe('upper case directive tests', () => {
  runTypeTest({
    name: 'TextField',
    typeDefinition: textFieldDefinition,
    typeResolver: textFieldResolver,
    directiveOption: {
      name: 'upperCase',
      definition: upperCaseDefinition,
      resolver: UpperCaseDirective,
      inputDirectives: '@upperCase'
    },
    inputTests: [
      {
        valid: true,
        queryType: 'Mutation',
        inputType: 'JSON',
        input: 'some text',
        expected: 'SOME TEXT'
      },
      {
        valid: true,
        queryType: 'Mutation',
        inputType: 'Literal',
        input: '"some text"',
        expected: 'SOME TEXT'
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
