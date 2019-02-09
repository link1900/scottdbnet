import { makeExecutableSchema, gql } from 'apollo-server-express';
import { emailDefinition, emailResolver } from '../emailType';
import { callGraphql } from '../../../server/__tests__/testHelpers';

describe('emailType', () => {
  const testingDefinition = gql`
    type Testing {
      field: Email
    }

    input TestInput {
      field: Email
    }

    type Query {
      getTest: Testing
    }

    type Mutation {
      updateTest(input: TestInput!): Testing
    }
  `;

  function getTestSchema() {
    return makeExecutableSchema({
      typeDefs: [testingDefinition, emailDefinition],
      resolvers: {
        Query: {
          getTest: () => {
            return { field: 'test@originenergy.com.au' };
          }
        },
        Mutation: {
          updateTest: (root: any, args: any) => {
            return {
              field: args.input.field
            };
          }
        },
        Email: emailResolver
      }
    });
  }

  it('renders type correctly', async () => {
    const query = gql`
      query Test {
        getTest {
          field
        }
      }
    `;
    const vars = {};

    const result = await callGraphql(query, vars, undefined, false, getTestSchema());
    const testingResult = result.data && result.data.getTest;
    expect(testingResult.field).toEqual('test@originenergy.com.au');
  });

  it('parses type as input correctly', async () => {
    const query = gql`
      mutation Test($input: TestInput!) {
        updateTest(input: $input) {
          field
        }
      }
    `;
    const vars = {
      input: {
        field: 'test@originenergy.com.au'
      }
    };

    const result = await callGraphql(query, vars, undefined, false, getTestSchema());
    const testingResult = result.data && result.data.updateTest;
    expect(testingResult.field).toEqual('test@originenergy.com.au');
  });

  it('parses type as input literal correctly', async () => {
    const query = gql`
      mutation Test {
        updateTest(input: { field: "test@originenergy.com.au" }) {
          field
        }
      }
    `;
    const vars = {};

    const result = await callGraphql(query, vars, undefined, false, getTestSchema());
    const testingResult = result.data && result.data.updateTest;
    expect(testingResult.field).toEqual('test@originenergy.com.au');
  });

  it('errors when input is invalid', async () => {
    const query = gql`
      mutation Test($input: TestInput!) {
        updateTest(input: $input) {
          field
        }
      }
    `;
    const vars = {
      input: {
        field: '@@@'
      }
    };

    const result = await callGraphql(query, vars, undefined, true, getTestSchema());
    const { data, errors } = result;
    expect(data && data.updateTest).toBeFalsy();
    expect(errors && errors.length).toEqual(1);
    expect(errors && errors[0].message).toContain('Not a valid email');
  });

  it('errors when input is invalid as literal', async () => {
    const query = gql`
      mutation Test {
        updateTest(input: { field: "@@@" }) {
          field
        }
      }
    `;
    const vars = {};

    const result = await callGraphql(query, vars, undefined, true, getTestSchema());
    const { data, errors } = result;
    expect(data && data.updateTest).toBeFalsy();
    expect(errors && errors.length).toEqual(1);
    expect(errors && errors[0].message).toContain('Not a valid email');
  });
});
