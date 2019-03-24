import { gql } from 'apollo-server-core';
import { createMutation } from '../../graphql/graphqlSchemaBuilders';
import ServerContext from '../../server/ServerContext';
import { MutationInput, MutationPayload } from '../../graphql/graphqlSchemaTypes';
import { Role } from '../../server/Role';
import NotFoundError from '../../error/NotFoundError';
import UserInputError from '../../error/UserInputError';
import { InvalidFieldReason } from '../../error/InvalidFieldReason';
import { Greyhound } from './Greyhound';
import { checkIfGreyhoundNameExists } from './greyhoundHelper';

export const updateGreyhoundMutationDefinition = gql`
  input UpdateGreyhoundInput {
    id: NodeId!
    name: TextField! @notEmpty @upperCase
    color: TextField
    gender: GreyhoundGender
    dateOfBirth: DateTime
    clientMutationId: String
  }

  type UpdateGreyhoundPayload {
    greyhound: Greyhound
    clientMutationId: String
  }

  extend type Mutation {
    updateGreyhound(input: UpdateGreyhoundInput!): UpdateGreyhoundPayload
  }
`;

export type UpdateGreyhoundInput = Partial<Greyhound> & MutationInput;
export type UpdateGreyhoundPayload = {
  greyhound: Greyhound;
} & MutationPayload;

export async function updateGreyhoundResolver(
  input: UpdateGreyhoundInput,
  context: ServerContext
): Promise<UpdateGreyhoundPayload> {
  context.checkForRole(Role.ADMIN);
  const { id } = input;
  if (!id) {
    throw new UserInputError(`id is required`, 'id', InvalidFieldReason.REQUIRED);
  }
  let greyhound = await context.loaders.greyhound.findById(id);
  if (!greyhound) {
    throw new NotFoundError(`greyhound with id ${id} does not exist`);
  }

  greyhound = Object.assign(greyhound, input);
  await checkIfGreyhoundNameExists(context, greyhound.name, greyhound.id);
  const updatedGreyhound = await context.loaders.greyhound.update(greyhound);
  return {
    greyhound: updatedGreyhound
  };
}

export const updateGreyhoundMutation = createMutation({
  name: 'updateGreyhound',
  definition: updateGreyhoundMutationDefinition,
  resolver: updateGreyhoundResolver
});
