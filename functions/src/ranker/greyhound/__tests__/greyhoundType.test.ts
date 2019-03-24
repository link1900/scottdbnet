import { gql } from 'apollo-server-express';
import {
  buildQueryFunction,
  clearDatabase,
  closeDatabase,
  getContextAndFixture
} from '../../../server/__tests__/testHelpers';

describe('greyhoundType', () => {
  beforeEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  it('gets the greyhound correctly via node id', async () => {
    const { fixture } = await getContextAndFixture();
    const { greyhound1, sire1, dam1 } = fixture;
    const node = await runGreyhoundNodeQuery({ id: greyhound1.nodeId });
    expect(node.id).toEqual(greyhound1.nodeId);
    expect(node.createdAt).toBeTruthy();
    expect(node.updatedAt).toBeTruthy();
    expect(node.name).toEqual(greyhound1.name);
    expect(node.sire.name).toEqual(sire1.name);
    expect(node.dam.name).toEqual(dam1.name);
    expect(node.color).toEqual(greyhound1.color);
    expect(node.gender).toEqual('DOG');
    expect(node.dateOfBirth).toEqual(greyhound1.dateOfBirth!.toISOString());
  });

  it('gets the greyhound correctly via connection', async () => {
    const { fixture } = await getContextAndFixture();
    const { greyhound1, sire1, dam1 } = fixture;
    const greyhounds = await runGreyhoundConnectionQuery({ filters: { name_equal: greyhound1.name } });
    const { edges } = greyhounds;
    expect(edges.length).toEqual(1);
    const edge = edges[0];
    const node = edge.node;
    expect(node.id).toEqual(greyhound1.nodeId);
    expect(node.createdAt).toBeTruthy();
    expect(node.updatedAt).toBeTruthy();
    expect(node.name).toEqual(greyhound1.name);
    expect(node.sire.name).toEqual(sire1.name);
    expect(node.dam.name).toEqual(dam1.name);
    expect(node.color).toEqual(greyhound1.color);
    expect(node.gender).toEqual('DOG');
    expect(node.dateOfBirth).toEqual(greyhound1.dateOfBirth!.toISOString());
  });
});

const runGreyhoundConnectionQuery = buildQueryFunction(
  gql`
    query greyhoundQuery(
      $first: Int
      $after: String
      $last: Int
      $before: String
      $orderBy: GreyhoundOrderBy
      $filters: GreyhoundFilter
    ) {
      ranker {
        greyhounds(first: $first, after: $after, last: $last, before: $before, orderBy: $orderBy, filters: $filters) {
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
          edges {
            cursor
            node {
              id
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
      }
    }
  `,
  'ranker.greyhounds'
);

const runGreyhoundNodeQuery = buildQueryFunction(
  gql`
    query greyhoundNodeQuery($id: ID!) {
      node(id: $id) {
        id
        ... on Greyhound {
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
  'node'
);
