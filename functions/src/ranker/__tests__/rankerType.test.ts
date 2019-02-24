import { callGraphql } from '../../server/__tests__/testHelpers';
import { gql } from 'apollo-server-core';
import ServerContext from '../../server/ServerContext';
import { Greyhound } from '../greyhound/Greyhound';
import { createBaseContext } from '../../server/graphqlSchema';
import { closeDatabaseConnection } from '../../server/serverHelper';

describe('rankerType', () => {
  let context: ServerContext;

  beforeEach(async () => {
    context = await createBaseContext();
  });

  afterAll(async () => {
    await closeDatabaseConnection();
  });

  describe('greyhounds', () => {
    beforeEach(async () => {
      await context.loaders.greyhound.repository.clear();
      await Promise.all(
        Array(10)
          .fill(0)
          .map((i, index) => context.loaders.greyhound.create(new Greyhound(`${String.fromCharCode(index + 65)}`)))
      );
    });

    it('gets a list of greyhounds', async () => {
      const query = gql`
        query greyhoundQuery($first: Int, $after: String, $orderBy: GreyhoundOrderBy) {
          ranker {
            greyhounds(first: $first, after: $after, orderBy: $orderBy) {
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
                }
              }
            }
          }
        }
      `;
      const vars = { first: 5, orderBy: 'name_ASC' };
      const result = await callGraphql(query, vars, context);
      const { data } = result;
      if (!data || !data.ranker || !data.ranker.greyhounds) {
        throw new Error('Cannot find result data');
      }
      const greyhounds = data.ranker.greyhounds;
      const { edges, pageInfo } = greyhounds;
      expect(edges.length).toEqual(5);
      expect(edges[0].node.name).toEqual('A');
      expect(edges[1].node.name).toEqual('B');
      expect(edges[2].node.name).toEqual('C');
      expect(edges[3].node.name).toEqual('D');
      expect(edges[4].node.name).toEqual('E');
      expect(pageInfo.hasNextPage).toEqual(true);
      expect(pageInfo.hasPreviousPage).toEqual(false);

      // check the ordering continues for page 2
      const page2Vars = { first: 3, orderBy: 'name_ASC', after: edges[4].cursor };
      const result2 = await callGraphql(query, page2Vars, context);
      const { data: data2 } = result2;
      if (!data2 || !data2.ranker || !data2.ranker.greyhounds) {
        throw new Error('Cannot find result data');
      }
      const greyhounds2 = data2.ranker.greyhounds;

      const { edges: page2Edges, pageInfo: page2PageInfo } = greyhounds2;
      expect(page2Edges.length).toEqual(3);
      expect(page2PageInfo.hasNextPage).toEqual(true);
      expect(page2PageInfo.hasPreviousPage).toEqual(false);
      expect(page2Edges[0].node.name).toEqual('F');
      expect(page2Edges[1].node.name).toEqual('G');
      expect(page2Edges[2].node.name).toEqual('H');
    });
  });
});
