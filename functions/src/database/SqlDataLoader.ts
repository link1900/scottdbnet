import DataLoader from 'dataloader';
import { Model, Instance } from 'sequelize';
import { BaseAttributes } from './databaseTypes';

export class SqlDataLoader<ModelInstance extends Instance<BaseAttributes>> extends DataLoader<string, ModelInstance> {
  public model: Model<ModelInstance, BaseAttributes>;

  constructor(someModel: Model<ModelInstance, any>) {
    super(async (ids: string[]) => {
      if (!ids || ids.length < 1) {
        return [];
      }
      return someModel.findAll({ where: { id: { $in: ids } } });
    });
    this.model = someModel;
  }

  public async create(data: any): Promise<ModelInstance> {
    const createdEntity = await this.model.create(data);
    // this.evictCachedEntity(createdEntity);
    // this.cacheEntity(createdEntity);
    return createdEntity;
  }

  // public async update(entity: ModelInstance): Promise<ModelInstance> {
  //   this.evictCachedEntity(entity);
  //   const updatedEntity = await entity.save();
  //   this.cacheEntity(updatedEntity);
  //   return updatedEntity;
  // }
  //
  // public async delete(entity) {
  //   this.evictCachedEntity(entity);
  //   return entity.destroy();
  // }
  //
  //
  // public evictCachedEntity(entity: ModelInstance) {
  //   if (entity && entity.id) {
  //     this.clear(entity.id);
  //   }
  // }
  //
  // public cacheEntity(entity: ModelInstance) {
  //   if (entity && entity.id) {
  //     this.prime(entity.id, entity);
  //   }
  // }
}
