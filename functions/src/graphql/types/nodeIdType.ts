import { gql } from 'apollo-server-core';
import { GraphQLError, GraphQLScalarType, Kind } from 'graphql';
import { createScalar, fromGlobalId } from '../graphqlSchemaBuilders';

export const nodeIdDefinition = gql`
  scalar NodeId
`;

export const nodeIdResolver = new GraphQLScalarType({
  name: 'NodeId',
  description: 'Represents a node id',
  serialize: value => {
    return value;
  },
  parseValue: value => {
    return fromGlobalId(value).id;
  },
  parseLiteral: ast => {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Error: can only parse strings got a: ${ast.kind}`, [ast]);
    }
    return fromGlobalId(ast.value).id;
  }
});

export const nodeIdType = createScalar({
  name: 'NodeId',
  definition: nodeIdDefinition,
  scalar: nodeIdResolver
});
