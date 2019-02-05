import { Sequelize as Seq, Model, Instance } from 'sequelize';
import { GreyhoundAttributes, greyhoundSchema } from '../ranker/greyhound/greyhoundSchema';
import { createModel } from '../database/databaseHelper';

export type DatabaseModels = {
  greyhound: Model<Instance<GreyhoundAttributes>, GreyhoundAttributes>;
};

export async function createModels(seq: Seq): Promise<DatabaseModels> {
  return {
    greyhound: await createModel(seq, greyhoundSchema)
  };
}
