import { runTypeTest } from './typeTestHelper';
import { textFieldRequiredDefinition, textFieldRequiredResolver } from '../textFieldRequired';

describe('text field required type tests', () => {
  runTypeTest({
    name: 'TextFieldRequired',
    typeDefinition: textFieldRequiredDefinition,
    typeResolver: textFieldRequiredResolver,
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
