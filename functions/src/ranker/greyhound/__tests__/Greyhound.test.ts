import { getDatabaseConnection } from '../../../server/serverHelper';
import { clearAllEntities } from '../../../database/databaseHelper';
import { Greyhound } from '../Greyhound';
import { Repository } from 'typeorm';

describe('greyhound model tests', () => {
  let greyhoundRepository: Repository<Greyhound>;

  beforeAll(async () => {
    const connection = await getDatabaseConnection();
    greyhoundRepository = connection.getRepository(Greyhound);
    await clearAllEntities(connection);
  });

  describe('model operations', () => {
    it('creates and reads entity correctly', async () => {
      // creation test
      let greyhound = new Greyhound();
      greyhound.name = 'test greyhound';
      greyhound = await greyhoundRepository.save(greyhound);
      expect(greyhound.name).toEqual('test greyhound');

      // find test
      const lookupGreyhound = await greyhoundRepository.findOne(greyhound.id);
      expect(lookupGreyhound).toBeTruthy();
      if (!lookupGreyhound) {
        throw new Error('type failure');
      }
      expect(lookupGreyhound.name).toEqual('test greyhound');

      // update test
      lookupGreyhound.name = 'test 2 greyhound';
      const updatedGreyhound = await greyhoundRepository.save(lookupGreyhound);
      expect(updatedGreyhound.name).toEqual('test 2 greyhound');
      const lookupUpdatedGreyhound = await greyhoundRepository.findOne(updatedGreyhound.id);
      expect(lookupUpdatedGreyhound).toBeTruthy();
      if (!lookupUpdatedGreyhound) {
        throw new Error('type failure');
      }
      expect(lookupUpdatedGreyhound.name).toEqual('test 2 greyhound');
      expect(lookupUpdatedGreyhound.version).toEqual(2);

      // delete test
      const deletedGreyhound = await greyhoundRepository.remove(lookupUpdatedGreyhound);
      const lookupDeleteGreyhound = await greyhoundRepository.findOne(deletedGreyhound.id);
      expect(lookupDeleteGreyhound).toBeFalsy();
    });
  });
});