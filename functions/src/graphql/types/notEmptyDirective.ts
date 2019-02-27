import { gql, SchemaDirectiveVisitor } from 'apollo-server-cloud-functions';
import { createDirective, wrapType } from '../graphqlSchemaBuilders';
import CustomStringType from './customStringType';

export const notEmptyDefinition = gql`
  directive @notEmpty on INPUT_FIELD_DEFINITION
`;

class NotEmptyType {
  constructor(type: any) {
    return new CustomStringType(`${type.name}NotEmpty`, `${type.description} Field must have at least one character.`, {
      min: 1
    });
  }
}

export class NotEmptyDirective extends SchemaDirectiveVisitor {
  visitInputFieldDefinition(field: any) {
    return wrapType(field, this.schema, NotEmptyType);
  }
}

export const notEmptyDirective = createDirective({
  name: 'notEmpty',
  definition: notEmptyDefinition,
  resolver: NotEmptyDirective
});
