import { gql } from 'apollo-server-core';
import { createQuery } from '../graphql/graphqlSchemaBuilders';

const applicationConfigDefinition = gql`
  type ApplicationConfig {
    name: String
  }

  extend type Query {
    applicationConfig: ApplicationConfig
  }
`;

const applicationConfigResolver = () => {
  return {
    name: 'Scott DB'
  };
};

export const applicationConfigType = createQuery({
  name: 'applicationConfig',
  definition: applicationConfigDefinition,
  resolver: applicationConfigResolver
});
