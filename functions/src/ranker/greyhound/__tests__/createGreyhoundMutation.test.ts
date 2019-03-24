import { gql } from 'apollo-server-express';
import {
  buildQueryFunction,
  clearDatabase,
  closeDatabase,
  getContextAndFixture
} from '../../../server/__tests__/testHelpers';

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
  beforeEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
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
    const { fixture } = await getContextAndFixture();
    const { greyhound1 } = fixture;
    const vars = {
      input: {
        name: greyhound1.name
      }
    };
    const result = await runGreyhoundMutation(vars, true);
    expect(result.message).toContain('already exists');
  });
});
