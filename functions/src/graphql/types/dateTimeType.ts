import { gql } from '../graphqlTools';
import { GraphQLError, GraphQLScalarType, Kind } from 'graphql';
import moment = require('moment-timezone');
import { isString } from 'lodash';
import { createScalar } from '../graphqlSchemaBuilders';

export const dateTimeDefinition = gql`
  scalar DateTime
`;

export const dateTimeResolver = new GraphQLScalarType({
  name: 'DateTime',
  description: 'Represents a date time. Format is full length ISO-8601 which is the format: YYYY-MM-DDTHH:mm:ss.sssZ',
  serialize: value => {
    if (value instanceof Date) {
      return value.toISOString();
    } else if (isString(value)) {
      return moment(value).toISOString();
    } else {
      return null;
    }
  },
  parseValue: value => {
    return moment(value).toDate();
  },
  parseLiteral: ast => {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Error: can only parse strings got a: ${ast.kind}`, [ast]);
    }
    return moment(ast.value).toDate();
  }
});

export const dateTimeType = createScalar({
  name: 'DateTime',
  definition: dateTimeDefinition,
  scalar: dateTimeResolver
});
