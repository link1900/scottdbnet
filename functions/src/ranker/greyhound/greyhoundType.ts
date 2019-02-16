import { gql } from 'apollo-server-core';
import { createType, toGlobalId } from '../../graphql/graphqlSchemaBuilders';
import { Greyhound } from './Greyhound';
import ServerContext from '../../server/ServerContext';

export const greyhoundDefinition = gql`
  type Greyhound implements Node {
    id: ID!
    name: String!
  }
`;

export const greyhoundResolver = {
  id: ({ id }: Greyhound) => toGlobalId('Greyhound', id)
};

export async function greyhoundNodeResolver(id: string, context: ServerContext) {
  return context.loaders.greyhound.load(id);
}

export const greyhoundType = createType({
  name: 'Greyhound',
  definition: greyhoundDefinition,
  resolver: greyhoundResolver,
  nodeResolver: greyhoundNodeResolver
});
