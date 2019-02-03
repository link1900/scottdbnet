import { GraphQLError, GraphQLScalarType, GraphQLFloat } from 'graphql';
import { isValidNumber, NumberValidationOptions } from '../../validation/numberValidation';

export default class CustomFloatType extends GraphQLScalarType {
  constructor(name: string, description: string, options: NumberValidationOptions) {
    super({
      name,
      description,
      serialize: value => {
        return GraphQLFloat.serialize(value);
      },
      parseValue: value => {
        const result = GraphQLFloat.parseValue(value);

        if (!isValidNumber(value, options)) {
          throw new GraphQLError('Error: Not a valid float');
        }

        return result;
      },
      parseLiteral: (ast, variables) => {
        const result = GraphQLFloat.parseLiteral(ast, variables);

        if (!isValidNumber(result, options)) {
          throw new GraphQLError('Error: Not a valid float', [ast]);
        }
        return result;
      }
    });
  }
}
