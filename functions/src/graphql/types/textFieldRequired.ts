import { gql } from 'apollo-server-core';
import CustomStringType from './customStringType';
import { createScalar } from '../graphqlSchemaBuilders';

export const textFieldRequiredDefinition = gql`
  scalar TextFieldRequired
`;

export const textFieldRequiredResolver = new CustomStringType(
  'TextFieldRequired',
  'String that can be no longer then 150 characters and must be at least one character long.',
  { min: 1, max: 150 }
);

export const textFieldRequiredType = createScalar({
  name: 'TextFieldRequired',
  definition: textFieldRequiredDefinition,
  scalar: textFieldRequiredResolver
});
