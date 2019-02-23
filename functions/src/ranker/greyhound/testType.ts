import { gql } from 'apollo-server-core';
import { createQuery, createType } from '../../graphql/graphqlSchemaBuilders';
import { runQueryBuilderAsConnection } from '../../graphql/connectionForSqlQuery';
import ServerContext from '../../server/ServerContext';
import { ConnectionArguments } from '../../graphql/graphqlSchemaTypes';

export const testTypeQueryDefinition = gql`
  extend type Query {
    testType: TestType
  }
`;

async function greyhoundsResolve(parent: any, args: ConnectionArguments, context: ServerContext) {
  const queryBuilder = await context.loaders.greyhound.repository.createQueryBuilder('greyhound');
  return runQueryBuilderAsConnection(queryBuilder, args);
}

const testTypeDefinition = gql`
  type TestType {
    greyhound: Greyhound
    greyhounds(before: String, after: String, first: Int, last: Int): GreyhoundConnection
  }
`;

export const testType = createType({
  name: 'TestType',
  definition: testTypeDefinition,
  resolver: {
    greyhounds: greyhoundsResolve
  }
});

export const testTypeQuery = createQuery({
  name: 'testType',
  definition: testTypeQueryDefinition,
  resolver: () => {
    return {
      greyhound: {
        id: '123',
        name: 'some'
      },
      greyhounds: {
        some: 'parent'
      }
    };
  }
});
