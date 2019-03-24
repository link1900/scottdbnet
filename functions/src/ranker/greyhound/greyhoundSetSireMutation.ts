import { gql } from 'apollo-server-core';
import { createMutation } from '../../graphql/graphqlSchemaBuilders';
import ServerContext from '../../server/ServerContext';
import { MutationInput, MutationPayload } from '../../graphql/graphqlSchemaTypes';
import { Role } from '../../server/Role';
import NotFoundError from '../../error/NotFoundError';
import { Greyhound } from './Greyhound';
import UserInputError from '../../error/UserInputError';
import { InvalidFieldReason } from '../../error/InvalidFieldReason';

export const setSireGreyhoundMutationDefinition = gql`
  input SetSireGreyhoundInput {
    id: NodeId!
    sireId: NodeId!
    clientMutationId: String
  }

  type SetSireGreyhoundPayload {
    greyhound: Greyhound
    clientMutationId: String
  }

  extend type Mutation {
    setSireGreyhound(input: SetSireGreyhoundInput!): SetSireGreyhoundPayload
  }
`;

export type SetSireGreyhoundInput = { id: string; sireId: string } & MutationInput;
export type SetSireGreyhoundPayload = {
  greyhound: Greyhound;
} & MutationPayload;

export async function setSireGreyhoundResolver(
  input: SetSireGreyhoundInput,
  context: ServerContext
): Promise<SetSireGreyhoundPayload> {
  context.checkForRole(Role.ADMIN);
  const { id, sireId } = input;
  const greyhound = await context.loaders.greyhound.findById(id);
  if (!greyhound) {
    throw new NotFoundError(`greyhound with id ${id} does not exist`);
  }

  const sire = await context.loaders.greyhound.findById(sireId);
  if (!sire) {
    throw new NotFoundError(`greyhound with id ${sireId} does not exist`);
  }

  if (sire.id === greyhound.id) {
    throw new UserInputError('cannot be own parent', 'sireId', InvalidFieldReason.INVALID);
  }

  if (greyhound.damId && sire.id === greyhound.damId) {
    throw new UserInputError('cannot have the same sire and dam', 'sireId', InvalidFieldReason.INVALID);
  }

  greyhound.sireId = sireId;
  const updatedGreyhound = await context.loaders.greyhound.update(greyhound);
  return {
    greyhound: updatedGreyhound
  };
}

export const setSireGreyhoundMutation = createMutation({
  name: 'setSireGreyhound',
  definition: setSireGreyhoundMutationDefinition,
  resolver: setSireGreyhoundResolver
});
