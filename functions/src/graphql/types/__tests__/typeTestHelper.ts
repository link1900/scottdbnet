import { callGraphql } from '../../../server/__tests__/testHelpers';
import { makeExecutableSchema, gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

export type GraphqlTypeTestOptions = {
  name: string;
  typeDefinition: DocumentNode;
  typeResolver: any;
  queryResult: any;
  mutationResult: any;
  inputTests: GraphqlTypeTestInputOptions[];
};

export type GraphqlTypeTestInputOptions = {
  valid: boolean;
  queryType: 'Mutation' | 'Query';
  inputType: 'JSON' | 'Literal';
  input: any;
  expected: any;
  queryResultOverride?: any;
};

export function runTypeTestCase(options: GraphqlTypeTestOptions, testcase: GraphqlTypeTestInputOptions) {
  const { valid, inputType, queryType, expected, input, queryResultOverride } = testcase;
  const { name, queryResult, mutationResult, typeResolver, typeDefinition } = options;
  const schema = getTestSchema(name, typeDefinition, typeResolver, queryResultOverride || queryResult, mutationResult);
  if (queryType === 'Query') {
    if (valid) {
      runValidQueryTestCase(schema, expected);
    } else {
      runInvalidQueryTestCase(schema);
    }
  }

  if (queryType === 'Mutation') {
    if (valid) {
      if (inputType === 'JSON') {
        runValidVarsMutationTestCase(schema, input, expected);
      } else {
        runValidLiteralMutationTestCase(schema, input, expected);
      }
    } else {
      if (inputType === 'JSON') {
        runInvalidVarsMutationTestCase(schema, input);
      } else {
        runInvalidLiteralMutationTestCase(schema, input);
      }
    }
  }
}

export function runValidQueryTestCase(schema: any, queryExpected: any) {
  it('run query  correctly', async () => {
    const query = gql`
      query Test {
        getTest {
          field
        }
      }
    `;
    const vars = {};

    const result = await callGraphql(query, vars, undefined, false, schema);
    const testingResult = result.data && result.data.getTest;
    expect(testingResult.field).toEqual(queryExpected);
  });
}

export function runInvalidQueryTestCase(schema: any) {
  it('errors for query', async () => {
    const query = gql`
      query Test {
        getTest {
          field
        }
      }
    `;
    const vars = {};

    const result = await callGraphql(query, vars, undefined, true, schema);
    const { data, errors } = result;
    expect(data && data.updateTest).toBeFalsy();
    expect(errors && errors.length).toEqual(1);
  });
}

export function runValidVarsMutationTestCase(schema: any, input: any, expected: any) {
  it('runs the mutation with vars correctly', async () => {
    const query = gql`
      mutation Test($input: TestInput!) {
        updateTest(input: $input) {
          field
        }
      }
    `;
    const vars = {
      input: {
        field: input
      }
    };

    const result = await callGraphql(query, vars, undefined, false, schema);
    const testingResult = result.data && result.data.updateTest;
    expect(testingResult.field).toEqual(expected);
  });
}

export function runValidLiteralMutationTestCase(schema: any, input: any, expected: any) {
  it('runs the mutation with literals correctly', async () => {
    const query = gql`
      mutation Test {
        updateTest(input: { field: ${input} }) {
          field
        }
      }
    `;
    const vars = {};

    const result = await callGraphql(query, vars, undefined, false, schema);
    const testingResult = result.data && result.data.updateTest;
    expect(testingResult.field).toEqual(expected);
  });
}

export function runInvalidVarsMutationTestCase(schema: any, input: any) {
  it('errors for mutation when vars input is invalid', async () => {
    const query = gql`
      mutation Test($input: TestInput!) {
        updateTest(input: $input) {
          field
        }
      }
    `;
    const vars = {
      input: {
        field: input
      }
    };

    const result = await callGraphql(query, vars, undefined, true, schema);
    const { data, errors } = result;
    expect(data && data.updateTest).toBeFalsy();
    expect(errors && errors.length).toEqual(1);
  });
}

export function runInvalidLiteralMutationTestCase(schema: any, input: any) {
  it('errors when input is invalid as literal', async () => {
    const query = gql`
      mutation Test {
        updateTest(input: { field: ${input} }) {
          field
        }
      }
    `;
    const vars = {};

    const result = await callGraphql(query, vars, undefined, true, schema);
    const { data, errors } = result;
    expect(data && data.updateTest).toBeFalsy();
    expect(errors && errors.length).toEqual(1);
  });
}

export function getTestSchema(
  name: string,
  typeDefinition: any,
  typeResolver: any,
  queryResult: any,
  mutationResult: any
) {
  const testingDefinition = gql`
    type Testing {
      field: ${name}
    }

    input TestInput {
      field: ${name}
    }

    type Query {
      getTest: Testing
    }

    type Mutation {
      updateTest(input: TestInput!): Testing
    }
  `;

  return makeExecutableSchema({
    typeDefs: [testingDefinition, typeDefinition],
    resolvers: {
      Query: {
        getTest: () => {
          return { field: queryResult };
        }
      },
      Mutation: {
        updateTest: () => {
          return {
            field: mutationResult
          };
        }
      },
      [name]: typeResolver
    }
  });
}

export function runTypeTest(options: GraphqlTypeTestOptions) {
  const { inputTests } = options;

  inputTests.forEach(inputTest => {
    runTypeTestCase(options, inputTest);
  });
}
