import { SqlDataLoader } from '../database/SqlDataLoader';
import { DatabaseModels } from './databaseModels';
import { Instance } from 'sequelize';
import { GreyhoundAttributes } from '../ranker/greyhound/greyhoundSchema';

export type DataLoaders = {
  greyhound: SqlDataLoader<Instance<GreyhoundAttributes>>;
};

export async function createDataLoaders(models: DatabaseModels): Promise<DataLoaders> {
  return {
    greyhound: new SqlDataLoader(models.greyhound)
  };
}
