import { SqlDataLoader } from '../database/SqlDataLoader';
import { Greyhound } from '../ranker/greyhound/Greyhound';
import { Repository, Connection } from 'typeorm';

export type DataLoaders = {
  greyhound: SqlDataLoader<Greyhound, Repository<Greyhound>>;
};

export async function createDataLoaders(connection: Connection): Promise<DataLoaders> {
  return {
    greyhound: new SqlDataLoader<Greyhound, Repository<Greyhound>>(connection.getRepository(Greyhound))
  };
}
