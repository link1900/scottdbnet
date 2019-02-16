import { gql } from 'apollo-server-core';
import { GraphQLError, GraphQLScalarType, GraphQLString } from 'graphql';
import { isEmail } from '../../validation/emailValidation';
import { createScalar } from '../graphqlSchemaBuilders';

export const emailDefinition = gql`
  scalar Email
`;

export const emailResolver = new GraphQLScalarType({
  name: 'Email',
  description: 'Represents a valid email according to RFCs 5321 and 5322',
  serialize: value => GraphQLString.serialize(value),
  parseValue: value => {
    const result = GraphQLString.parseValue(value);
    if (!isEmail(result)) {
      throw new GraphQLError(`Error: Not a valid email: ${result}`);
    }
    return result;
  },
  parseLiteral: (ast, variables) => {
    const result = GraphQLString.parseLiteral(ast, variables);
    if (!isEmail(result)) {
      throw new GraphQLError('Error: Not a valid email', [ast]);
    }
    return result;
  }
});

export const emailType = createScalar({
  name: 'Email',
  definition: emailDefinition,
  scalar: emailResolver
});
