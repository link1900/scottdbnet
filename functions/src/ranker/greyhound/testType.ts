import { gql } from '../../graphql/graphqlTools';
import { createQuery } from '../../graphql/graphqlSchemaBuilders';

export const testTypeDefinition = gql`
  type TestType {
    greyhound: Greyhound
  }

  extend type Query {
    testType: TestType
  }
`;

export const testType = createQuery({
  name: 'testType',
  definition: testTypeDefinition,
  resolver: () => {
    return {
      greyhound: {
        id: '123',
        name: 'some'
      }
    };
  }
});
