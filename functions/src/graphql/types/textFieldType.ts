import { gql } from '../graphqlTools';
import CustomStringType from './customStringType';
import { createScalar } from '../graphqlSchemaBuilders';

export const textFieldDefinition = gql`
  scalar TextField
`;

export const textFieldResolver = new CustomStringType(
  'TextField',
  'String that can be no longer then 150 characters.',
  { max: 150 }
);

export const textFieldType = createScalar({
  name: 'TextField',
  definition: textFieldDefinition,
  scalar: textFieldResolver
});
