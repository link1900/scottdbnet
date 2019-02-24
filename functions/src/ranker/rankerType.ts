import { gql } from 'apollo-server-core';
import { createQuery, createType } from '../graphql/graphqlSchemaBuilders';
import ServerContext from '../server/ServerContext';
import { ConnectionArguments } from '../graphql/graphqlSchemaTypes';

async function greyhoundsResolve(parent: any, args: ConnectionArguments, context: ServerContext) {
  return context.loaders.greyhound.getConnection(args);
}

const rankerTypeDefinition = gql`
  type Ranker {
    greyhounds(
      before: String
      after: String
      first: Int
      last: Int
      filters: GreyhoundFilter
      orderBy: GreyhoundOrderBy
    ): GreyhoundConnection
  }
`;

export const rankerType = createType({
  name: 'Ranker',
  definition: rankerTypeDefinition,
  resolver: {
    greyhounds: greyhoundsResolve
  }
});

export const rankerTypeQueryDefinition = gql`
  extend type Query {
    ranker: Ranker
  }
`;

export const rankerQuery = createQuery({
  name: 'ranker',
  definition: rankerTypeQueryDefinition,
  resolver: () => ({})
});
