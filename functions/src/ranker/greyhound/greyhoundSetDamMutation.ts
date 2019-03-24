import { gql } from 'apollo-server-core';
import { createMutation } from '../../graphql/graphqlSchemaBuilders';
import ServerContext from '../../server/ServerContext';
import { MutationInput, MutationPayload } from '../../graphql/graphqlSchemaTypes';
import { Role } from '../../server/Role';
import NotFoundError from '../../error/NotFoundError';
import { Greyhound } from './Greyhound';
import UserInputError from '../../error/UserInputError';
import { InvalidFieldReason } from '../../error/InvalidFieldReason';

export const setDamGreyhoundMutationDefinition = gql`
  input SetDamGreyhoundInput {
    id: NodeId!
    damId: NodeId!
    clientMutationId: String
  }

  type SetDamGreyhoundPayload {
    greyhound: Greyhound
    clientMutationId: String
  }

  extend type Mutation {
    setDamGreyhound(input: SetDamGreyhoundInput!): SetDamGreyhoundPayload
  }
`;

export type SetDamGreyhoundInput = { id: string; damId: string } & MutationInput;
export type SetDamGreyhoundPayload = {
  greyhound: Greyhound;
} & MutationPayload;

export async function setDamGreyhoundResolver(
  input: SetDamGreyhoundInput,
  context: ServerContext
): Promise<SetDamGreyhoundPayload> {
  context.checkForRole(Role.ADMIN);
  const { id, damId } = input;
  const greyhound = await context.loaders.greyhound.findById(id);
  if (!greyhound) {
    throw new NotFoundError(`greyhound with id ${id} does not exist`);
  }

  const dam = await context.loaders.greyhound.findById(damId);
  if (!dam) {
    throw new NotFoundError(`greyhound with id ${damId} does not exist`);
  }

  if (dam.id === greyhound.id) {
    throw new UserInputError('cannot be own parent', 'damId', InvalidFieldReason.INVALID);
  }

  if (greyhound.damId && dam.id === greyhound.damId) {
    throw new UserInputError('cannot have the same dam and sire', 'damId', InvalidFieldReason.INVALID);
  }

  greyhound.damId = damId;
  const updatedGreyhound = await context.loaders.greyhound.update(greyhound);
  return {
    greyhound: updatedGreyhound
  };
}

export const setDamGreyhoundMutation = createMutation({
  name: 'setDamGreyhound',
  definition: setDamGreyhoundMutationDefinition,
  resolver: setDamGreyhoundResolver
});
