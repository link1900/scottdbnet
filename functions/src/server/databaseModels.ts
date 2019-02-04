import { Sequelize as Seq, Model } from 'sequelize';
import { GreyhoundModelInstance, greyhoundSchema } from '../ranker/greyhound/greyhoundSchema';
import { createModel } from '../database/databaseHelper';

export type DatabaseModels = {
  greyhound: Model<GreyhoundModelInstance, any>;
};

export async function createModels(seq: Seq): Promise<DatabaseModels> {
  return {
    greyhound: await createModel(seq, greyhoundSchema)
  };
}
