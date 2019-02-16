import { gql } from 'apollo-server-core';
import { GraphQLError, GraphQLScalarType, Kind } from 'graphql';
import { isPhone } from '../../validation/phoneValidation';
import { createScalar } from '../graphqlSchemaBuilders';

export const phoneDefinition = gql`
  scalar Phone
`;

export const phoneResolver = new GraphQLScalarType({
  name: 'Phone',
  description: 'Phone number that represent various formats',
  serialize: value => value,
  parseValue: value => {
    if (typeof value !== 'string') {
      throw new GraphQLError(`Error: can only parse strings got a: ${typeof value}`, [value]);
    }
    if (isPhone(value)) {
      return value;
    }
    throw new GraphQLError(`Error: expected a phone number ${value}`);
  },
  parseLiteral: ast => {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Error: can only parse strings got a: ${ast.kind}`, [ast]);
    }
    if (isPhone(ast.value)) {
      return ast.value;
    }
    throw new GraphQLError(`Error: expected a phone number ${ast.value}`, [ast]);
  }
});

export const phoneType = createScalar({
  name: 'Phone',
  definition: phoneDefinition,
  scalar: phoneResolver
});
