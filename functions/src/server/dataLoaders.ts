import { SqlDataLoader } from '../database/SqlDataLoader';
import { Greyhound } from '../ranker/greyhound/Greyhound';
import { Repository, Connection } from 'typeorm';
import { Race } from '../ranker/race/Race';
import { Placing } from '../ranker/placing/Placing';
import { Score } from '../ranker/score/Score';

export type DataLoaders = {
  greyhound: SqlDataLoader<Greyhound, Repository<Greyhound>>;
  race: SqlDataLoader<Race, Repository<Race>>;
  placing: SqlDataLoader<Placing, Repository<Placing>>;
  score: SqlDataLoader<Score, Repository<Score>>;
};

export async function createDataLoaders(connection: Connection): Promise<DataLoaders> {
  return {
    greyhound: new SqlDataLoader<Greyhound, Repository<Greyhound>>(connection.getRepository(Greyhound), 'greyhound'),
    race: new SqlDataLoader<Race, Repository<Race>>(connection.getRepository(Race), 'race'),
    placing: new SqlDataLoader<Placing, Repository<Placing>>(connection.getRepository(Placing), 'placing'),
    score: new SqlDataLoader<Score, Repository<Score>>(connection.getRepository(Score), 'score')
  };
}
