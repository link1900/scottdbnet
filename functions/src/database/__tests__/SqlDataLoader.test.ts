import { closeDatabaseConnection, getDatabaseConnection } from '../../server/serverHelper';
import { clearAllEntities } from '../databaseHelper';
import { Greyhound } from '../../ranker/greyhound/Greyhound';
import { Repository } from 'typeorm';
import { SqlDataLoader } from '../SqlDataLoader';

describe('SqlDataLoader tests', () => {
  let loader: SqlDataLoader<Greyhound, Repository<Greyhound>>;

  beforeAll(async () => {
    const connection = await getDatabaseConnection();
    const greyhoundRepository = connection.getRepository(Greyhound);
    loader = new SqlDataLoader(greyhoundRepository);
    await clearAllEntities(connection);
  });

  afterAll(async () => {
    await closeDatabaseConnection();
  });

  describe('loader operations', () => {
    it('#create and #load', async () => {
      // creation test
      let greyhound = new Greyhound();
      greyhound.name = 'test greyhound';
      greyhound = await loader.create(greyhound);
      expect(greyhound.name).toEqual('test greyhound');

      const lookupGreyhound = await loader.load(greyhound.id);
      expect(lookupGreyhound).toBeTruthy();
      if (!lookupGreyhound) {
        throw new Error('type failure');
      }
      expect(lookupGreyhound.name).toEqual('test greyhound');
    });

    it('#update', async () => {
      // creation test
      let greyhound = new Greyhound();
      greyhound.name = 'update greyhound';
      greyhound = await loader.create(greyhound);
      expect(greyhound.name).toEqual('update greyhound');

      // update test
      greyhound.name = 'test 2 greyhound';
      const updatedGreyhound = await loader.update(greyhound);
      expect(updatedGreyhound.name).toEqual('test 2 greyhound');
      const lookupUpdatedGreyhound = await loader.load(updatedGreyhound.id);
      expect(lookupUpdatedGreyhound).toBeTruthy();
      if (!lookupUpdatedGreyhound) {
        throw new Error('type failure');
      }
      expect(lookupUpdatedGreyhound.name).toEqual('test 2 greyhound');
      expect(lookupUpdatedGreyhound.version).toEqual(2);
    });

    it('#delete', async () => {
      let greyhound = new Greyhound();
      greyhound.name = 'delete greyhound';
      greyhound = await loader.create(greyhound);
      expect(greyhound.name).toEqual('delete greyhound');

      // delete test
      const id = greyhound.id;
      const deleteResult = await loader.delete(greyhound);
      expect(deleteResult).toBeTruthy();
      const lookupDeleteGreyhound = await loader.load(id);
      expect(lookupDeleteGreyhound).toBeFalsy();
    });
  });
});
