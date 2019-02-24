import assert from 'assert';
import { DocumentNode, ExecutionResult, graphql, GraphQLSchema } from 'graphql';
import { ExecutionResultDataDefault } from 'graphql/execution/execute';
import { getGraphqlSchemaFromDefinition } from '../../graphql/graphqlSchemaBuilders';
import { graphqlSchemaDefinition } from '../graphqlSchema';
import { Context } from '../../graphql/graphqlSchemaTypes';

let schema: GraphQLSchema | undefined;

export async function getTestGraphqlContext(): Promise<Context> {
  return {};
}

export function getSchema(): GraphQLSchema {
  if (!schema) {
    schema = getGraphqlSchemaFromDefinition(graphqlSchemaDefinition);
  }
  return schema;
}

export function graphqlResultToSimpleErrors(result: ExecutionResult<ExecutionResultDataDefault>) {
  if (!result || !result.errors) {
    return [];
  }

  return result.errors.map(e => {
    const { message, locations, originalError } = e;
    const stack = originalError ? originalError.stack : '';
    return { message, locations, stack };
  });
}

export function queryDocToString(queryDoc: DocumentNode) {
  return queryDoc.loc && queryDoc.loc.source.body ? queryDoc.loc.source.body : '';
}

export async function callGraphqlWithSchema(
  queryDoc: DocumentNode,
  variables: object,
  someSchema: GraphQLSchema,
  context = getTestGraphqlContext()
) {
  const query = queryDocToString(queryDoc);
  return graphql(someSchema, query, context, context, variables);
}

export async function callGraphql(
  queryDoc: DocumentNode,
  variables: object,
  context: Context = getTestGraphqlContext(),
  expectErrors = false,
  someSchema = getSchema()
) {
  const result: ExecutionResult<ExecutionResultDataDefault> = await callGraphqlWithSchema(
    queryDoc,
    variables,
    someSchema,
    context
  );
  const errorCount = result && result.errors && result.errors.length ? result.errors.length : 0;
  const hasErrors = errorCount > 0;

  if (expectErrors) {
    assert(hasErrors, `GraphQL query should return errors but did not. Result: ${JSON.stringify(result)}.`);
    return result;
  }

  const graphqlErrors = graphqlResultToSimpleErrors(result);
  assert(
    !hasErrors,
    `GraphQL query should return no errors but errors were detected.\nResult: ${JSON.stringify(
      result.data,
      null,
      2
    )}\nVars: ${JSON.stringify(variables, null, 2)}\nQuery: ${queryDocToString(queryDoc)}\nErrors: ${JSON.stringify(
      graphqlErrors,
      null,
      2
    )}`
  );

  return result;
}

describe('testHelpers', () => {
  it('#getTestGraphqlContext', async () => {
    const context = await getTestGraphqlContext();
    expect(context).toBeTruthy();
  });
});
