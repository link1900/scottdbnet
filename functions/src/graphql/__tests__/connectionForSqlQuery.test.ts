import { closeDatabaseConnection } from '../../server/serverHelper';
import { Greyhound } from '../../ranker/greyhound/Greyhound';
import { runQueryBuilderAsConnection } from '../connectionForSqlQuery';
import ServerContext from '../../server/ServerContext';
import { base64Encode, objectToString } from '../../util/stringHelper';
import { getContextAndFixture } from '../../server/__tests__/testHelpers';

describe('connectionForSqlQuery', () => {
  let context: ServerContext;
  let greyhounds: Greyhound[];

  beforeEach(async () => {
    const { context: someContext } = await getContextAndFixture();
    context = someContext;
    await context.loaders.greyhound.repository.clear();
    greyhounds = await Promise.all(
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

  describe('#runQueryBuilderAsConnection', () => {
    it('returns the 5 edges when requested', async () => {
      const queryDefinition = context.loaders.greyhound.repository.createQueryBuilder('greyhound');
      const args = { first: 5 };
      const { edges, pageInfo } = await runQueryBuilderAsConnection(queryDefinition, args);
      expect(edges.length).toEqual(5);
      expect(pageInfo.hasNextPage).toEqual(true);
      expect(pageInfo.hasPreviousPage).toEqual(false);
    });

    it('returns an empty connection if no data is returned by query', async () => {
      await context.loaders.greyhound.repository.clear();
      const queryDefinition = context.loaders.greyhound.repository.createQueryBuilder('greyhound');
      const args = { first: 5 };
      const { edges, pageInfo } = await runQueryBuilderAsConnection(queryDefinition, args);
      expect(edges.length).toEqual(0);
      expect(pageInfo.hasNextPage).toEqual(false);
      expect(pageInfo.hasPreviousPage).toEqual(false);
    });

    it('returns default max 10 results when passed no parameters', async () => {
      const queryDefinition = context.loaders.greyhound.repository.createQueryBuilder('greyhound');
      await Promise.all(
        Array(2)
          .fill(0)
          .map((i, index) =>
            context.loaders.greyhound.create(new Greyhound({ name: `${String.fromCharCode(index + 75)}` }))
          )
      );
      const args = { first: 10 };
      const { edges, pageInfo } = await runQueryBuilderAsConnection(queryDefinition, args);
      expect(edges.length).toEqual(10);
      expect(pageInfo.hasNextPage).toEqual(true);
      expect(pageInfo.hasPreviousPage).toEqual(false);
    });

    describe('Check various return lengths', () => {
      [3, 5, 7, 10].forEach(firstArg => {
        it(`returns the ${firstArg} edges when requested`, async () => {
          const queryDefinition = context.loaders.greyhound.repository.createQueryBuilder('greyhound');
          const args = { first: firstArg };
          const { edges, pageInfo } = await runQueryBuilderAsConnection(queryDefinition, args);
          expect(edges.length).toEqual(firstArg);
          expect(pageInfo.hasNextPage).toEqual(firstArg === 10 ? false : true);
          expect(pageInfo.hasPreviousPage).toEqual(false);
        });
      });
    });

    it('applies after argument correctly', async () => {
      const greyhoundH = greyhounds.find(g => g.name === 'H');
      if (!greyhoundH) {
        throw new Error('test data issue');
      }
      const cursor = base64Encode(objectToString({ name: greyhoundH.name, id: greyhoundH.id }));
      const queryDefinition = context.loaders.greyhound.repository
        .createQueryBuilder('greyhound')
        .orderBy('name', 'ASC');
      const args = { after: cursor };
      const { edges, pageInfo } = await runQueryBuilderAsConnection(queryDefinition, args);
      expect(edges.length).toEqual(2);
      expect(edges[0].node.name).toEqual('I');
      expect(edges[1].node.name).toEqual('J');
      expect(pageInfo.hasNextPage).toEqual(false);
      expect(pageInfo.hasPreviousPage).toEqual(false);
    });

    it('applies before argument correctly', async () => {
      const greyhoundH = greyhounds.find(g => g.name === 'H');
      if (!greyhoundH) {
        throw new Error('test data issue');
      }
      const cursor = base64Encode(objectToString({ name: greyhoundH.name, id: greyhoundH.id }));
      const queryDefinition = context.loaders.greyhound.repository
        .createQueryBuilder('greyhound')
        .orderBy('name', 'ASC');
      const args = { before: cursor };
      const { edges, pageInfo } = await runQueryBuilderAsConnection(queryDefinition, args);
      expect(edges.length).toEqual(7);
      expect(edges[0].node.name).toEqual('A');
      expect(edges[1].node.name).toEqual('B');
      expect(edges[2].node.name).toEqual('C');
      expect(edges[3].node.name).toEqual('D');
      expect(edges[4].node.name).toEqual('E');
      expect(edges[5].node.name).toEqual('F');
      expect(edges[6].node.name).toEqual('G');
      expect(pageInfo.hasNextPage).toEqual(false);
      expect(pageInfo.hasPreviousPage).toEqual(false);
    });

    it('applies first argument correctly', async () => {
      const queryDefinition = context.loaders.greyhound.repository
        .createQueryBuilder('greyhound')
        .orderBy('name', 'ASC');
      const args = { first: 5 };
      const { edges, pageInfo } = await runQueryBuilderAsConnection(queryDefinition, args);
      expect(edges.length).toEqual(5);
      expect(edges[0].node.name).toEqual('A');
      expect(edges[1].node.name).toEqual('B');
      expect(edges[2].node.name).toEqual('C');
      expect(edges[3].node.name).toEqual('D');
      expect(edges[4].node.name).toEqual('E');
      expect(pageInfo.hasNextPage).toEqual(true);
      expect(pageInfo.hasPreviousPage).toEqual(false);
    });

    it('applies last argument correctly', async () => {
      const queryDefinition = context.loaders.greyhound.repository
        .createQueryBuilder('greyhound')
        .orderBy('name', 'ASC');
      const args = { last: 5 };
      const { edges, pageInfo } = await runQueryBuilderAsConnection(queryDefinition, args);
      expect(edges.length).toEqual(5);
      expect(edges[0].node.name).toEqual('F');
      expect(edges[1].node.name).toEqual('G');
      expect(edges[2].node.name).toEqual('H');
      expect(edges[3].node.name).toEqual('I');
      expect(edges[4].node.name).toEqual('J');
      expect(pageInfo.hasNextPage).toEqual(false);
      expect(pageInfo.hasPreviousPage).toEqual(true);
    });

    it('applies after and last arguments correctly', async () => {
      const queryDefinition = context.loaders.greyhound.repository
        .createQueryBuilder('greyhound')
        .orderBy({ name: 'ASC' });
      const args = { first: 2 };
      const { edges, pageInfo } = await runQueryBuilderAsConnection<Greyhound>(queryDefinition, args);
      expect(edges.length).toEqual(2);
      expect(pageInfo.hasNextPage).toEqual(true);
      expect(pageInfo.hasPreviousPage).toEqual(false);
      expect(edges[0].node.name).toEqual('A');
      expect(edges[1].node.name).toEqual('B');

      // check the ordering continues for page 2
      const queryDefinition2nd = context.loaders.greyhound.repository
        .createQueryBuilder('greyhound')
        .orderBy({ name: 'ASC' });
      const page2Args = { last: 2, after: edges[1].cursor };
      const { edges: page2Edges, pageInfo: page2PageInfo } = await runQueryBuilderAsConnection<Greyhound>(
        queryDefinition2nd,
        page2Args
      );
      expect(page2Edges.length).toEqual(2);
      expect(page2PageInfo.hasNextPage).toEqual(false);
      expect(page2PageInfo.hasPreviousPage).toEqual(true);
      expect(page2Edges[0].node.name).toEqual('I');
      expect(page2Edges[1].node.name).toEqual('J');
    });

    it('applies before and first arguments correctly', async () => {
      const queryDefinition = context.loaders.greyhound.repository
        .createQueryBuilder('greyhound')
        .orderBy({ name: 'ASC' });
      const args = { last: 2 };
      const { edges, pageInfo } = await runQueryBuilderAsConnection<Greyhound>(queryDefinition, args);
      expect(edges.length).toEqual(2);
      expect(pageInfo.hasNextPage).toEqual(false);
      expect(pageInfo.hasPreviousPage).toEqual(true);
      expect(edges[0].node.name).toEqual('I');
      expect(edges[1].node.name).toEqual('J');

      // check the ordering continues for page 2
      const queryDefinition2nd = context.loaders.greyhound.repository
        .createQueryBuilder('greyhound')
        .orderBy({ name: 'ASC' });
      const page2Args = { first: 2, before: edges[1].cursor };
      const { edges: page2Edges, pageInfo: page2PageInfo } = await runQueryBuilderAsConnection<Greyhound>(
        queryDefinition2nd,
        page2Args
      );
      expect(page2Edges.length).toEqual(2);
      expect(page2PageInfo.hasNextPage).toEqual(true);
      expect(page2PageInfo.hasPreviousPage).toEqual(false);
      expect(page2Edges[0].node.name).toEqual('A');
      expect(page2Edges[1].node.name).toEqual('B');
    });

    it('applies after and first arguments correctly', async () => {
      const queryDefinition = context.loaders.greyhound.repository
        .createQueryBuilder('greyhound')
        .orderBy({ name: 'DESC' });
      const args = { first: 5 };
      const { edges, pageInfo } = await runQueryBuilderAsConnection<Greyhound>(queryDefinition, args);
      expect(edges.length).toEqual(5);
      expect(pageInfo.hasNextPage).toEqual(true);
      expect(pageInfo.hasPreviousPage).toEqual(false);
      expect(edges[0].node.name).toEqual('J');
      expect(edges[1].node.name).toEqual('I');
      expect(edges[2].node.name).toEqual('H');
      expect(edges[3].node.name).toEqual('G');
      expect(edges[4].node.name).toEqual('F');

      // check the ordering continues for page 2
      const page2Args = { first: 3, after: edges[4].cursor };
      const { edges: page2Edges, pageInfo: page2PageInfo } = await runQueryBuilderAsConnection<Greyhound>(
        queryDefinition,
        page2Args
      );
      expect(page2Edges.length).toEqual(3);
      expect(page2PageInfo.hasNextPage).toEqual(true);
      expect(page2PageInfo.hasPreviousPage).toEqual(false);
      expect(page2Edges[0].node.name).toEqual('E');
      expect(page2Edges[1].node.name).toEqual('D');
      expect(page2Edges[2].node.name).toEqual('C');
    });

    it('applies and before and last arguments correctly', async () => {
      const queryDefinition = context.loaders.greyhound.repository
        .createQueryBuilder('greyhound')
        .orderBy({ name: 'ASC' });
      const args = { last: 5 };
      const { edges, pageInfo } = await runQueryBuilderAsConnection<Greyhound>(queryDefinition, args);
      expect(edges.length).toEqual(5);
      expect(pageInfo.hasNextPage).toEqual(false);
      expect(pageInfo.hasPreviousPage).toEqual(true);
      expect(edges[0].node.name).toEqual('F');
      expect(edges[1].node.name).toEqual('G');
      expect(edges[2].node.name).toEqual('H');
      expect(edges[3].node.name).toEqual('I');
      expect(edges[4].node.name).toEqual('J');

      // check the ordering continues for page 2
      const queryDefinition2nd = context.loaders.greyhound.repository
        .createQueryBuilder('greyhound')
        .orderBy({ name: 'ASC' });
      const page2Args = { last: 2, before: edges[0].cursor };
      const { edges: page2Edges, pageInfo: page2PageInfo } = await runQueryBuilderAsConnection<Greyhound>(
        queryDefinition2nd,
        page2Args
      );
      expect(page2Edges.length).toEqual(2);
      expect(page2PageInfo.hasNextPage).toEqual(false);
      expect(page2PageInfo.hasPreviousPage).toEqual(true);
      expect(page2Edges[0].node.name).toEqual('D');
      expect(page2Edges[1].node.name).toEqual('E');
    });

    it('throws an error when first is negative', async () => {
      const queryDefinition = context.loaders.greyhound.repository
        .createQueryBuilder('greyhound')
        .orderBy({ name: 'ASC' });
      const args = { first: -5 };

      try {
        await runQueryBuilderAsConnection<Greyhound>(queryDefinition, args);
        expect(true).toBeFalsy();
      } catch (e) {
        expect(e).toMatchSnapshot();
      }
    });

    it('throws an error when last is negative', async () => {
      const queryDefinition = context.loaders.greyhound.repository
        .createQueryBuilder('greyhound')
        .orderBy({ name: 'ASC' });
      const args = { last: -5 };

      try {
        await runQueryBuilderAsConnection<Greyhound>(queryDefinition, args);
        expect(true).toBeFalsy();
      } catch (e) {
        expect(e).toMatchSnapshot();
      }
    });

    it('throws an error when first and last is provided', async () => {
      const queryDefinition = context.loaders.greyhound.repository
        .createQueryBuilder('greyhound')
        .orderBy({ name: 'ASC' });
      const args = { first: 5, last: 5 };

      try {
        await runQueryBuilderAsConnection<Greyhound>(queryDefinition, args);
        expect(true).toBeFalsy();
      } catch (e) {
        expect(e).toMatchSnapshot();
      }
    });
  });
});
