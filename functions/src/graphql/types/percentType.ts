import { gql } from '../graphqlTools';
import CustomFloatType from './customFloatType';
import { createScalar } from '../graphqlSchemaBuilders';

export const percentDefinition = gql`
  scalar Percent
`;

export const percentResolver = new CustomFloatType('Percent', 'A float between 0 and 1', { min: 0, max: 1 });

export const percentType = createScalar({
  name: 'Percent',
  definition: percentDefinition,
  scalar: percentResolver
});
