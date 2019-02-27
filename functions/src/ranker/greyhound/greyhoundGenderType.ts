import { gql } from 'apollo-server-express';
import { createEnum } from '../../graphql/graphqlSchemaBuilders';

export const greyhoundGenderDefinition = gql`
  enum GreyhoundGender {
    DOG
    BITCH
  }
`;

export enum GreyhoundGender {
  DOG = 'dog',
  BITCH = 'bitch'
}

export const greyhoundGenderResolver = {
  DOG: GreyhoundGender.DOG,
  BITCH: GreyhoundGender.BITCH
};

export const greyhoundGenderType = createEnum({
  name: 'GreyhoundGender',
  definition: greyhoundGenderDefinition,
  resolver: greyhoundGenderResolver
});
