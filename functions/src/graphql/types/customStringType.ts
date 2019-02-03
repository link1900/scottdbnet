import { isString } from 'lodash';
import { GraphQLScalarType } from 'graphql';
import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql/language';
import { isValidString, StringValidationOptions } from '../../validation/stringValidation';

export default class CustomStringType extends GraphQLScalarType {
  constructor(name: string, description: string, options: StringValidationOptions) {
    super({
      name,
      description,
      serialize: value => {
        if (isString(value)) {
          return value;
        }
        if (value && value.toString) {
          return value.toString();
        }
        return null;
      },
      parseValue: value => {
        if (typeof value !== 'string') {
          throw new GraphQLError(`Error: can only parse strings got a: ${typeof value}`, [value]);
        }

        if (!isValidString(value, options)) {
          throw new GraphQLError(`Error: Not a valid string value: ${value}`);
        }
        return value;
      },
      parseLiteral: ast => {
        if (ast.kind !== Kind.STRING) {
          throw new GraphQLError(`Error: can only parse strings got a: ${ast.kind}`, [ast]);
        }

        if (!isValidString(ast.value, options)) {
          throw new GraphQLError('Error: Not a valid string', [ast]);
        }

        return ast.value;
      }
    });
  }
}
