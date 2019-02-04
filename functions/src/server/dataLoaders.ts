import { SqlDataLoader } from '../database/SqlDataLoader';
import { DatabaseModels } from './databaseModels';
import { GreyhoundModelInstance } from '../ranker/greyhound/greyhoundSchema';

export type DataLoaders = {
  greyhound: SqlDataLoader<GreyhoundModelInstance>;
};

export async function createDataLoaders(models: DatabaseModels): Promise<DataLoaders> {
  return {
    greyhound: new SqlDataLoader(models.greyhound)
  };
}
