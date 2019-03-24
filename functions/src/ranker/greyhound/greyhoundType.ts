import { gql } from 'apollo-server-core';
import { createType } from '../../graphql/graphqlSchemaBuilders';
import { Greyhound } from './Greyhound';
import ServerContext from '../../server/ServerContext';

export const greyhoundDefinition = gql`
  type Greyhound implements Node {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    sire: Greyhound
    dam: Greyhound
    color: String
    gender: GreyhoundGender
    dateOfBirth: DateTime
  }
`;

export const greyhoundResolver = {
  id: (greyhound: Greyhound) => greyhound.nodeId,
  sire: ({ sireId }: Greyhound, args: any, context: ServerContext) => {
    if (!sireId) {
      return undefined;
    }
    return context.loaders.greyhound.load(sireId);
  },
  dam: ({ damId }: Greyhound, args: any, context: ServerContext) => {
    if (!damId) {
      return undefined;
    }
    return context.loaders.greyhound.load(damId);
  }
};

export async function greyhoundNodeResolver(id: string, context: ServerContext) {
  return context.loaders.greyhound.load(id);
}

export const greyhoundType = createType({
  name: 'Greyhound',
  definition: greyhoundDefinition,
  resolver: greyhoundResolver,
  nodeResolver: greyhoundNodeResolver,
  hasConnection: true
});
