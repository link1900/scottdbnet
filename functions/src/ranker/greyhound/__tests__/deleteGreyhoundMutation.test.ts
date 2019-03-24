import { gql } from 'apollo-server-express';
import {
  buildQueryFunction,
  clearDatabase,
  closeDatabase,
  createAdminContext,
  getContextAndFixture
} from '../../../server/__tests__/testHelpers';
import { Greyhound } from '../Greyhound';
import { toGlobalId } from '../../../graphql/graphqlSchemaBuilders';

const runDeleteMutation = buildQueryFunction(
  gql`
    mutation DeleteGreyhound($input: DeleteGreyhoundInput!) {
      deleteGreyhound(input: $input) {
        clientMutationId
        deletedId
      }
    }
  `,
  'deleteGreyhound'
);

describe('deleteGreyhoundMutation', () => {
  beforeEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  it('deletes greyhound correctly', async () => {
    const { fixture, context } = await getContextAndFixture();
    const { greyhound1 } = fixture;
    const vars = {
      input: {
        clientMutationId: 'testClientId',
        id: greyhound1.nodeId
      }
    };
    const result = await runDeleteMutation(vars);
    expect(result.clientMutationId).toEqual('testClientId');
    const { deletedId } = result;
    expect(deletedId).toEqual(greyhound1.nodeId);
    const lookup = await context.loaders.greyhound.findById(greyhound1.id);
    expect(lookup).toBeFalsy();
  });

  it('fails when unauthenticated', async () => {
    const context = await createAdminContext();
    const existingGreyhound = await context.loaders.greyhound.create(new Greyhound({ name: 'EXISTING GREYHOUND' }));
    const vars = {
      input: {
        id: existingGreyhound.nodeId
      }
    };
    const result = await runDeleteMutation(vars, true, false);
    expect(result.message).toContain('You do not have the required role');
  });

  it('fails when id does not exist', async () => {
    const { fixture, context } = await getContextAndFixture();
    const { unusedId } = fixture;
    const vars = {
      input: {
        id: toGlobalId('Greyhound', unusedId)
      }
    };
    const result = await runDeleteMutation(vars, true);
    expect(result.message).toContain('does not exist');
  });
});
