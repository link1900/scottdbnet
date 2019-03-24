import { gql } from 'apollo-server-express';
import {
  buildQueryFunction,
  clearDatabase,
  closeDatabase,
  getContextAndFixture
} from '../../../server/__tests__/testHelpers';
import { Greyhound } from '../Greyhound';
import { toGlobalId } from '../../../graphql/graphqlSchemaBuilders';

const runMutation = buildQueryFunction(
  gql`
    mutation UpdateGreyhound($input: UpdateGreyhoundInput!) {
      updateGreyhound(input: $input) {
        clientMutationId
        greyhound {
          createdAt
          updatedAt
          name
          sire {
            id
            name
          }
          dam {
            id
            name
          }
          color
          gender
          dateOfBirth
        }
      }
    }
  `,
  'updateGreyhound'
);

describe('updateGreyhoundMutation', () => {
  beforeEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  it('updates greyhound correctly', async () => {
    const { fixture, context } = await getContextAndFixture();
    const { greyhound1 } = fixture;
    const vars = {
      input: {
        clientMutationId: 'testClientId',
        id: greyhound1.nodeId,
        name: 'other'
      }
    };
    const result = await runMutation(vars);
    expect(result.clientMutationId).toEqual('testClientId');
    const { greyhound } = result;
    expect(greyhound.name).toEqual('OTHER');
    const lookup = await context.loaders.greyhound.findById(greyhound1.id);
    if (!lookup) {
      throw new Error('entity not found');
    }
    expect(lookup.name).toEqual('OTHER');
  });

  it('fails when unauthenticated', async () => {
    const { fixture } = await getContextAndFixture();
    const { greyhound1 } = fixture;
    const vars = {
      input: {
        clientMutationId: 'testClientId',
        id: greyhound1.nodeId,
        name: 'other'
      }
    };
    const result = await runMutation(vars, true, false);
    expect(result.message).toContain('You do not have the required role');
  });

  it('fails when id does not exist', async () => {
    const { fixture } = await getContextAndFixture();
    const { unusedId } = fixture;
    const vars = {
      input: {
        id: toGlobalId('Greyhound', unusedId)
      }
    };
    const result = await runMutation(vars, true);
    expect(result.message).toContain('does not exist');
  });

  it('fails when name already exists', async () => {
    const { fixture } = await getContextAndFixture();
    const { greyhound1, sire1 } = fixture;
    const vars = {
      input: {
        id: greyhound1.nodeId,
        name: sire1.name
      }
    };
    const result = await runMutation(vars, true);
    expect(result.message).toContain('already exists');
  });
});
