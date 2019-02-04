import DataLoader from 'dataloader';
import { Model } from 'sequelize';

export class SqlDataLoader<T> extends DataLoader<string, T> {
  public model: Model<T, any>;

  constructor(someModel: Model<T, any>) {
    super(async (ids: string[]) => {
      if (!ids || ids.length < 1) {
        return [];
      }
      return someModel.findAll({ where: { id: { $in: ids } } });
    });
    this.model = someModel;
  }
}
