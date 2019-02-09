import { gql } from '../graphqlTools';
import { GraphQLError, GraphQLScalarType, Kind } from 'graphql';
import { isString } from 'lodash';
import { createScalar } from '../graphqlSchemaBuilders';
import { isValidISODateString } from '../../validation/dateValidation';
import moment from 'moment-timezone';

export const dateTimeDefinition = gql`
  scalar DateTime
`;

export const dateTimeResolver = new GraphQLScalarType({
  name: 'DateTime',
  description: 'Represents a date time. Format is full length ISO-8601 which is the format: YYYY-MM-DDTHH:mm:ss.sssZ',
  serialize: value => {
    if (value instanceof Date) {
      return value.toISOString();
    } else if (value instanceof moment) {
      // @ts-ignore
      return value.toDate().toISOString();
    } else if (isValidISODateString(value)) {
      return value;
    } else {
      throw new GraphQLError('Error tried to serialize an invalid date');
    }
  },
  parseValue: value => {
    if (!isValidISODateString(value)) {
      throw new GraphQLError('Error: can only parse strings in ISO format 8601');
    }
    return moment(value).toDate();
  },
  parseLiteral: ast => {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Error: can only parse strings got a: ${ast.kind}`, [ast]);
    }
    if (!isValidISODateString(ast.value)) {
      throw new GraphQLError('Error: can only parse strings in ISO format 8601');
    }
    return moment(ast.value).toDate();
  }
});

export const dateTimeType = createScalar({
  name: 'DateTime',
  definition: dateTimeDefinition,
  scalar: dateTimeResolver
});
