import assert from 'assert';
import { get, has } from 'lodash';
import { DocumentNode, ExecutionResult, graphql, GraphQLSchema } from 'graphql';
import { ExecutionResultDataDefault } from 'graphql/execution/execute';
import { getGraphqlSchemaFromDefinition } from '../../graphql/graphqlSchemaBuilders';
import { graphqlSchemaDefinition } from '../graphqlSchema';
import { Context } from '../../graphql/graphqlSchemaTypes';
import { closeDatabaseConnection, createContextFromRequest } from '../serverHelper';
import { Role } from '../Role';
import { createFixture } from './fixtureHelper';

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

export async function createAdminContext() {
  const context = await createContextFromRequest();
  context.roles = [Role.ADMIN];
  return context;
}

export async function getContextAndFixture() {
  const context = await createAdminContext();
  const fixture = await createFixture(context);
  return {
    context,
    fixture
  };
}

export async function clearDatabase() {
  const context = await createAdminContext();
  await context.loaders.greyhound.repository.clear();
  return true;
}

export async function closeDatabase() {
  await closeDatabaseConnection();
}

export async function createPublicContext() {
  return createContextFromRequest();
}

export function buildQueryFunction(query: any, accessKey: string) {
  return async function runQuery(vars: object, expectError: boolean = false, auth: boolean = true) {
    const context = auth ? await createAdminContext() : await createPublicContext();
    const result = await callGraphql(query, vars, context, expectError);
    if (expectError) {
      const { errors = [] } = result;
      return errors[0];
    }

    const { data } = result;

    if (!data || !has(data, accessKey)) {
      throw new Error('Cannot find result data');
    }
    return get(data, accessKey);
  };
}

describe('testHelpers', () => {
  it('#getTestGraphqlContext', async () => {
    const context = await getTestGraphqlContext();
    expect(context).toBeTruthy();
  });
});
