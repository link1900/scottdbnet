import { gql, SchemaDirectiveVisitor } from 'apollo-server-cloud-functions';
import { GraphQLScalarType } from 'graphql';
import { createDirective, wrapType } from '../graphqlSchemaBuilders';

export const upperCaseDefinition = gql`
  directive @upperCase on INPUT_FIELD_DEFINITION
`;

class UpperCaseType extends GraphQLScalarType {
  constructor(type: any) {
    super({
      name: `${type.name}UpperCase`,
      description: `${type.description} Upper cases the value of this input.`,
      serialize(value) {
        return type.serialize(value);
      },

      parseValue(value) {
        return type.parseValue(value).toUpperCase();
      },

      parseLiteral(ast) {
        return type.parseLiteral(ast).toUpperCase();
      }
    });
  }
}

export class UpperCaseDirective extends SchemaDirectiveVisitor {
  visitInputFieldDefinition(field: any) {
    return wrapType(field, this.schema, UpperCaseType);
  }
}

export const uppercaseDirective = createDirective({
  name: 'upperCase',
  definition: upperCaseDefinition,
  resolver: UpperCaseDirective
});
