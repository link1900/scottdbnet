import { gql } from 'apollo-server-express';
import { closeDatabaseConnection } from '../../../server/serverHelper';
import { buildQueryFunction, createAdminContext } from '../../../server/__tests__/testHelpers';
import { Greyhound } from '../Greyhound';

const runGreyhoundMutation = buildQueryFunction(
  gql`
    mutation CreateGreyhound($input: CreateGreyhoundInput!) {
      createGreyhound(input: $input) {
        clientMutationId
        greyhound {
          id
          name
          color
          gender
          dateOfBirth
        }
      }
    }
  `,
  'createGreyhound'
);

describe('createGreyhoundMutation', () => {
  beforeAll(async () => {
    const context = await createAdminContext();
    await context.loaders.greyhound.repository.clear();
  });

  afterAll(async () => {
    await closeDatabaseConnection();
  });

  it('create greyhound correctly', async () => {
    const vars = {
      input: {
        clientMutationId: 'testClientId',
        name: 'test',
        color: 'blue',
        gender: 'DOG',
        dateOfBirth: new Date().toISOString()
      }
    };
    const result = await runGreyhoundMutation(vars);
    expect(result.clientMutationId).toEqual('testClientId');
    const { greyhound } = result;
    expect(greyhound.id).toBeTruthy();
    expect(greyhound.name).toEqual('TEST');
    expect(greyhound.color).toEqual('blue');
    expect(greyhound.gender).toEqual('DOG');
    expect(greyhound.dateOfBirth).toEqual(vars.input.dateOfBirth);
  });

  it('fails when unauthenticated', async () => {
    const vars = {
      input: {
        name: 'test'
      }
    };
    const result = await runGreyhoundMutation(vars, true, false);
    expect(result.message).toContain('You do not have the required role');
  });

  it('fails when name already exists', async () => {
    const context = await createAdminContext();
    await context.loaders.greyhound.create(new Greyhound({ name: 'EXISTING GREYHOUND' }));
    const vars = {
      input: {
        name: 'existing greyhound'
      }
    };
    const result = await runGreyhoundMutation(vars, true);
    expect(result.message).toContain('already exists');
  });
});
