import { gql } from 'apollo-server-core';
import { createMutation } from '../../graphql/graphqlSchemaBuilders';
import ServerContext from '../../server/ServerContext';
import { MutationInput, MutationPayload } from '../../graphql/graphqlSchemaTypes';
import { Role } from '../../server/Role';
import NotFoundError from '../../error/NotFoundError';
import InternalServerError from '../../error/InternalServerError';
import UserInputError from '../../error/UserInputError';
import { InvalidFieldReason } from '../../error/InvalidFieldReason';

export const deleteGreyhoundMutationDefinition = gql`
  input DeleteGreyhoundInput {
    id: NodeId!
    clientMutationId: String
  }

  type DeleteGreyhoundPayload {
    deletedId: ID
    clientMutationId: String
  }

  extend type Mutation {
    deleteGreyhound(input: DeleteGreyhoundInput!): DeleteGreyhoundPayload
  }
`;

export type DeleteGreyhoundInput = { id?: string } & MutationInput;
export type DeleteGreyhoundPayload = {
  deletedId: string;
} & MutationPayload;

export async function deleteGreyhoundResolver(
  input: DeleteGreyhoundInput,
  context: ServerContext
): Promise<DeleteGreyhoundPayload> {
  context.checkForRole(Role.ADMIN);
  const { id } = input;
  if (!id) {
    throw new UserInputError(`id is required`, 'id', InvalidFieldReason.REQUIRED);
  }
  const greyhound = await context.loaders.greyhound.findById(id);
  if (!greyhound) {
    throw new NotFoundError(`greyhound with id ${id} does not exist`);
  }
  const deletedId = greyhound.nodeId;
  const result = await context.loaders.greyhound.delete(greyhound);
  if (result === false) {
    throw new InternalServerError(`Failed to delete greyhound ${id}`);
  }
  return {
    deletedId
  };
}

export const deleteGreyhoundMutation = createMutation({
  name: 'deleteGreyhound',
  definition: deleteGreyhoundMutationDefinition,
  resolver: deleteGreyhoundResolver
});
