import { callGraphql } from '../../server/__tests__/testHelpers';
import { gql } from 'apollo-server-core';
import { Greyhound } from '../greyhound/Greyhound';
import { createBaseContext } from '../../server/graphqlSchema';
import { closeDatabaseConnection } from '../../server/serverHelper';

describe('rankerType', () => {
  beforeAll(async () => {
    const context = await createBaseContext();
    await context.loaders.greyhound.repository.clear();
    await Promise.all(
      Array(10)
        .fill(0)
        .map((i, index) =>
          context.loaders.greyhound.create(new Greyhound({ name: `${String.fromCharCode(index + 65)}` }))
        )
    );
  });

  afterAll(async () => {
    await closeDatabaseConnection();
  });

  describe('greyhounds', () => {
    it('gets greyhounds', async () => {
      const greyhounds = await runGreyhoundQuery({});
      const { edges } = greyhounds;
      expect(edges.length).toEqual(10);
    });

    it('pages greyhounds', async () => {
      const greyhounds = await runGreyhoundQuery({ first: 5, orderBy: 'name_ASC' });
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
      const greyhounds2 = await runGreyhoundQuery(page2Vars);

      const { edges: page2Edges, pageInfo: page2PageInfo } = greyhounds2;
      expect(page2Edges.length).toEqual(3);
      expect(page2PageInfo.hasNextPage).toEqual(true);
      expect(page2PageInfo.hasPreviousPage).toEqual(false);
      expect(page2Edges[0].node.name).toEqual('F');
      expect(page2Edges[1].node.name).toEqual('G');
      expect(page2Edges[2].node.name).toEqual('H');
    });

    it('orders greyhounds by name ascending', async () => {
      const greyhounds = await runGreyhoundQuery({ orderBy: 'name_ASC' });
      const { edges } = greyhounds;
      expect(edges.length).toEqual(10);
      expect(edges[0].node.name).toEqual('A');
      expect(edges[1].node.name).toEqual('B');
      expect(edges[2].node.name).toEqual('C');
    });

    it('orders greyhounds by name descending', async () => {
      const greyhounds = await runGreyhoundQuery({ orderBy: 'name_DESC' });
      const { edges } = greyhounds;
      expect(edges.length).toEqual(10);
      expect(edges[0].node.name).toEqual('J');
      expect(edges[1].node.name).toEqual('I');
      expect(edges[2].node.name).toEqual('H');
    });

    describe('filters', () => {
      const testCases = [
        { filters: { name_equal: 'A' }, expected: ['A'] },
        { filters: { name_not: 'A' }, expected: ['B', 'C'] },
        { filters: { name_in: ['A', 'B'] }, expected: ['A', 'B'] },
        { filters: { name_notIn: ['A'] }, expected: ['B', 'C'] },
        { filters: { name_lt: 'B' }, expected: ['A'] },
        { filters: { name_lte: 'B' }, expected: ['A', 'B'] },
        { filters: { name_gt: 'B' }, expected: ['C', 'D'] },
        { filters: { name_gte: 'B' }, expected: ['B', 'C'] },
        { filters: { name_contains: 'A' }, expected: ['A'] },
        { filters: { name_notContains: 'A' }, expected: ['B', 'C'] },
        { filters: { name_startsWith: 'A' }, expected: ['A'] },
        { filters: { name_notStartsWith: 'A' }, expected: ['B', 'C'] },
        { filters: { name_endsWith: 'A' }, expected: ['A'] },
        { filters: { name_notEndsWith: 'A' }, expected: ['B', 'C'] }
      ];

      testCases.forEach(testCase => {
        it(`query with filters ${JSON.stringify(testCase.filters)}`, async () => {
          const greyhounds = await runGreyhoundQuery({ filters: testCase.filters, first: 2, orderBy: 'name_ASC' });
          const { edges } = greyhounds;
          expect(edges.length).toEqual(testCase.expected.length);
          testCase.expected.forEach(expectedValue => edges.find((edge: any) => edge.node.name === expectedValue));
        });
      });
    });
  });
});

async function runGreyhoundQuery(vars: object) {
  const context = await createBaseContext();
  const query = gql`
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
            }
          }
        }
      }
    }
  `;
  const result = await callGraphql(query, vars, context);
  const { data } = result;
  if (!data || !data.ranker || !data.ranker.greyhounds) {
    throw new Error('Cannot find result data');
  }
  return data.ranker.greyhounds;
}
