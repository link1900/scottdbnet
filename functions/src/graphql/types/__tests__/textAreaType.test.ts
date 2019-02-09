import { runTypeTest } from './typeTestHelper';
import { textAreaDefinition, textAreaResolver } from '../textAreaType';

describe('text area type tests', () => {
  runTypeTest({
    name: 'TextArea',
    typeDefinition: textAreaDefinition,
    typeResolver: textAreaResolver,
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
      }
    ]
  });
});
