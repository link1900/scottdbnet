import { callGraphql } from '../../../server/__tests__/testHelpers';
import { makeExecutableSchema, gql, SchemaDirectiveVisitor } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

export type GraphqlTypeTestOptions = {
  name: string;
  typeDefinition: DocumentNode;
  typeResolver: any;
  inputTests: GraphqlTypeTestInputOptions[];
  directiveOption?: GraphqlTypeTestDirectiveOptions;
};

export type GraphqlTypeTestInputOptions = {
  valid: boolean;
  queryType: 'Mutation' | 'Query';
  inputType: 'JSON' | 'Literal';
  input?: any;
  expected?: any;
};

export type GraphqlTypeTestDirectiveOptions = {
  name: string;
  definition: DocumentNode;
  resolver: typeof SchemaDirectiveVisitor;
  inputDirectives?: string;
};

export function runTypeTestCase(options: GraphqlTypeTestOptions, testcase: GraphqlTypeTestInputOptions) {
  const { valid, inputType, queryType, expected, input } = testcase;
  const { name, typeResolver, typeDefinition, directiveOption } = options;
  const schema = getTestSchema(name, typeDefinition, typeResolver, input, directiveOption);
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
  it(`runs query expecting to get ${queryExpected}`, async () => {
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
  it(`runs the mutation with vars input of ${input} expecting to get ${expected}`, async () => {
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
  it(`runs the mutation with literals input of ${input} expecting to get get ${expected}`, async () => {
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
  it(`errors for mutation when vars input is ${input}`, async () => {
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
  it(`errors for mutation when literal input is ${input}`, async () => {
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
  directiveOption?: GraphqlTypeTestDirectiveOptions
) {
  const testingDefinition = gql`
    type Testing {
      field: ${name}
    }

    input TestInput {
      field: ${name} ${directiveOption ? directiveOption.inputDirectives : ''}
    }

    type Query {
      getTest: Testing
    }

    type Mutation {
      updateTest(input: TestInput!): Testing
    }
  `;
  let typeDefs = [testingDefinition, typeDefinition];
  if (directiveOption) {
    typeDefs = typeDefs.concat([directiveOption.definition]);
  }
  const schemaDirectives = directiveOption ? { [directiveOption.name]: directiveOption.resolver } : undefined;
  // @ts-ignore
  return makeExecutableSchema({
    typeDefs,
    resolvers: {
      Query: {
        getTest: () => {
          return { field: queryResult };
        }
      },
      Mutation: {
        updateTest: (root: any, args: any) => {
          return {
            field: args.input.field
          };
        }
      },
      [name]: typeResolver
    },
    schemaDirectives
  });
}

export function runTypeTest(options: GraphqlTypeTestOptions) {
  const { inputTests } = options;

  inputTests.forEach(inputTest => {
    runTypeTestCase(options, inputTest);
  });
}
