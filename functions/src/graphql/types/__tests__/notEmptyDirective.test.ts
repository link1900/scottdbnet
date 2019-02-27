import { runTypeTest } from './typeTestHelper';
import { textFieldDefinition, textFieldResolver } from '../textFieldType';
import { notEmptyDefinition, NotEmptyDirective } from '../notEmptyDirective';

describe('upper case directive tests', () => {
  runTypeTest({
    name: 'TextField',
    typeDefinition: textFieldDefinition,
    typeResolver: textFieldResolver,
    directiveOption: {
      name: 'notEmpty',
      definition: notEmptyDefinition,
      resolver: NotEmptyDirective,
      inputDirectives: '@notEmpty'
    },
    inputTests: [
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
        input: ''
      },
      {
        valid: false,
        queryType: 'Mutation',
        inputType: 'Literal',
        input: '""'
      }
    ]
  });
});
