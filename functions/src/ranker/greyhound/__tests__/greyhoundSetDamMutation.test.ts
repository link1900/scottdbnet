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
    mutation SetDamGreyhound($input: SetDamGreyhoundInput!) {
      setDamGreyhound(input: $input) {
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
  'setDamGreyhound'
);

describe('setDamGreyhoundMutation', () => {
  beforeEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  it('updates greyhounds dam correctly', async () => {
    const { fixture, context } = await getContextAndFixture();
    const dam2 = await context.loaders.greyhound.create(new Greyhound({ name: 'DAM2' }));
    const { greyhound1 } = fixture;
    const vars = {
      input: {
        clientMutationId: 'testClientId',
        id: greyhound1.nodeId,
        damId: dam2.nodeId
      }
    };
    const result = await runMutation(vars);
    expect(result.clientMutationId).toEqual('testClientId');
    const { greyhound } = result;
    expect(greyhound.dam.name).toEqual('DAM2');
    const lookup = await context.loaders.greyhound.findById(greyhound1.id);
    if (!lookup) {
      throw new Error('entity not found');
    }
    expect(lookup.damId).toEqual(dam2.id);
  });

  it('fails when unauthenticated', async () => {
    const { fixture, context } = await getContextAndFixture();
    const dam2 = await context.loaders.greyhound.create(new Greyhound({ name: 'DAM2' }));
    const { greyhound1 } = fixture;
    const vars = {
      input: {
        clientMutationId: 'testClientId',
        id: greyhound1.nodeId,
        damId: dam2.nodeId
      }
    };
    const result = await runMutation(vars, true, false);
    expect(result.message).toContain('You do not have the required role');
  });

  it('fails when id does not exist', async () => {
    const { fixture, context } = await getContextAndFixture();
    const dam2 = await context.loaders.greyhound.create(new Greyhound({ name: 'DAM2' }));
    const { unusedId } = fixture;
    const vars = {
      input: {
        id: toGlobalId('Greyhound', unusedId),
        damId: dam2.nodeId
      }
    };
    const result = await runMutation(vars, true);
    expect(result.message).toContain('not exist');
  });

  it('fails when damId does not exist', async () => {
    const { fixture } = await getContextAndFixture();
    const { greyhound1, unusedId } = fixture;
    const vars = {
      input: {
        id: greyhound1.nodeId,
        damId: toGlobalId('Greyhound', unusedId)
      }
    };
    const result = await runMutation(vars, true);
    expect(result.message).toContain('not exist');
  });

  it('fails when damId is self', async () => {
    const { fixture } = await getContextAndFixture();
    const { greyhound1 } = fixture;
    const vars = {
      input: {
        clientMutationId: 'testClientId',
        id: greyhound1.nodeId,
        damId: greyhound1.nodeId
      }
    };
    const result = await runMutation(vars, true);
    expect(result.message).toContain('own parent');
  });

  it('fails when damId is damId', async () => {
    const { fixture } = await getContextAndFixture();
    const { greyhound1, dam1 } = fixture;
    const vars = {
      input: {
        id: greyhound1.nodeId,
        damId: dam1.nodeId
      }
    };
    const result = await runMutation(vars, true);
    expect(result.message).toContain('dam and sire');
  });
});
