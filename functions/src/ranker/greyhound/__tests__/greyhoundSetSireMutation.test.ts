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
    mutation SetSireGreyhound($input: SetSireGreyhoundInput!) {
      setSireGreyhound(input: $input) {
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
  'setSireGreyhound'
);

describe('setSireGreyhoundMutation', () => {
  beforeEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  it('updates greyhounds sire correctly', async () => {
    const { fixture, context } = await getContextAndFixture();
    const sire2 = await context.loaders.greyhound.create(new Greyhound({ name: 'SIRE2' }));
    const { greyhound1 } = fixture;
    const vars = {
      input: {
        clientMutationId: 'testClientId',
        id: greyhound1.nodeId,
        sireId: sire2.nodeId
      }
    };
    const result = await runMutation(vars);
    expect(result.clientMutationId).toEqual('testClientId');
    const { greyhound } = result;
    expect(greyhound.sire.name).toEqual('SIRE2');
    const lookup = await context.loaders.greyhound.findById(greyhound1.id);
    if (!lookup) {
      throw new Error('entity not found');
    }
    expect(lookup.sireId).toEqual(sire2.id);
  });

  it('fails when unauthenticated', async () => {
    const { fixture, context } = await getContextAndFixture();
    const sire2 = await context.loaders.greyhound.create(new Greyhound({ name: 'SIRE2' }));
    const { greyhound1 } = fixture;
    const vars = {
      input: {
        clientMutationId: 'testClientId',
        id: greyhound1.nodeId,
        sireId: sire2.nodeId
      }
    };
    const result = await runMutation(vars, true, false);
    expect(result.message).toContain('You do not have the required role');
  });

  it('fails when id does not exist', async () => {
    const { fixture, context } = await getContextAndFixture();
    const sire2 = await context.loaders.greyhound.create(new Greyhound({ name: 'SIRE2' }));
    const { unusedId } = fixture;
    const vars = {
      input: {
        id: toGlobalId('Greyhound', unusedId),
        sireId: sire2.nodeId
      }
    };
    const result = await runMutation(vars, true);
    expect(result.message).toContain('not exist');
  });

  it('fails when sireId does not exist', async () => {
    const { fixture } = await getContextAndFixture();
    const { greyhound1, unusedId } = fixture;
    const vars = {
      input: {
        id: greyhound1.nodeId,
        sireId: toGlobalId('Greyhound', unusedId)
      }
    };
    const result = await runMutation(vars, true);
    expect(result.message).toContain('not exist');
  });

  it('fails when sireId is self', async () => {
    const { fixture } = await getContextAndFixture();
    const { greyhound1 } = fixture;
    const vars = {
      input: {
        clientMutationId: 'testClientId',
        id: greyhound1.nodeId,
        sireId: greyhound1.nodeId
      }
    };
    const result = await runMutation(vars, true);
    expect(result.message).toContain('own parent');
  });

  it('fails when sireId is damId', async () => {
    const { fixture } = await getContextAndFixture();
    const { greyhound1, dam1 } = fixture;
    const vars = {
      input: {
        id: greyhound1.nodeId,
        sireId: dam1.nodeId
      }
    };
    const result = await runMutation(vars, true);
    expect(result.message).toContain('sire and dam');
  });
});
