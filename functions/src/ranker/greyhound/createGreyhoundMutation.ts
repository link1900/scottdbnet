import { gql } from 'apollo-server-core';
import { createMutation } from '../../graphql/graphqlSchemaBuilders';
import ServerContext from '../../server/ServerContext';
import { Greyhound } from './Greyhound';
import { MutationInput, MutationPayload } from '../../graphql/graphqlSchemaTypes';
import UserInputError from '../../error/UserInputError';
import { InvalidFieldReason } from '../../error/InvalidFieldReason';
import { Role } from '../../server/Role';
import { doesGreyhoundNameExist } from './greyhoundHelper';

export const createGreyhoundMutationDefinition = gql`
  input CreateGreyhoundInput {
    name: TextField! @notEmpty @upperCase
    color: TextField
    gender: GreyhoundGender
    dateOfBirth: DateTime
    clientMutationId: String
  }

  type CreateGreyhoundPayload {
    greyhound: Greyhound
    clientMutationId: String
  }

  extend type Mutation {
    createGreyhound(input: CreateGreyhoundInput!): CreateGreyhoundPayload
  }
`;

export type CreateGreyhoundInput = Partial<Greyhound> & MutationInput;
export type CreateGreyhoundPayload = {
  greyhound: Greyhound;
} & MutationPayload;

export async function createGreyhoundResolver(
  input: CreateGreyhoundInput,
  context: ServerContext
): Promise<CreateGreyhoundPayload> {
  context.checkForRole(Role.ADMIN);
  const greyhoundInput = new Greyhound(input);
  const nameAlreadyExists = await doesGreyhoundNameExist(context, greyhoundInput.name);
  if (nameAlreadyExists) {
    throw new UserInputError(
      `greyhound with name ${greyhoundInput.name} already exists`,
      'name',
      InvalidFieldReason.INVALID
    );
  }
  const greyhound = await context.loaders.greyhound.create(greyhoundInput);
  return {
    greyhound
  };
}

export const createGreyhoundMutation = createMutation({
  name: 'createGreyhound',
  definition: createGreyhoundMutationDefinition,
  resolver: createGreyhoundResolver
});
