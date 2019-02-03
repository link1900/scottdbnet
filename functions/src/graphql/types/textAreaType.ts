import { gql } from '../graphqlTools';
import CustomStringType from './customStringType';
import { createScalar } from '../graphqlSchemaBuilders';

export const textAreaDefinition = gql`
  scalar TextArea
`;

export const textAreaResolver = new CustomStringType('TextArea', 'String that can be no longer then 8000 characters.', {
  max: 8000
});

export const textAreaType = createScalar({
  name: 'TextArea',
  definition: textAreaDefinition,
  scalar: textAreaResolver
});
