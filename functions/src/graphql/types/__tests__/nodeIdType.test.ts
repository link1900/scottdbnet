import { runTypeTest } from './typeTestHelper';
import { nodeIdDefinition, nodeIdResolver } from '../nodeIdType';
import { base64Encode } from '../../../util/stringHelper';

describe('nodeIdType Tests', () => {
  runTypeTest({
    name: 'NodeId',
    typeDefinition: nodeIdDefinition,
    typeResolver: nodeIdResolver,
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
        input: base64Encode('some text'),
        expected: 'some text'
      },
      {
        valid: true,
        queryType: 'Mutation',
        inputType: 'Literal',
        input: `"${base64Encode('some text')}"`,
        expected: 'some text'
      }
    ]
  });
});
