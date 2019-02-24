import DataLoader from 'dataloader';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Connection, ConnectionArguments } from '../graphql/graphqlSchemaTypes';
import { BaseModel } from './BaseModel';
import { addFunction, runQueryBuilderAsConnection } from '../graphql/connectionForSqlQuery';

export class SqlDataLoader<
  EntityInstance extends BaseModel,
  RepositoryInstance extends Repository<EntityInstance>
> extends DataLoader<string, EntityInstance> {
  public repository: RepositoryInstance;
  public name: string;
  constructor(someRepository: RepositoryInstance, name: string) {
    super(async (ids: string[]) => {
      if (!ids || ids.length < 1) {
        return [];
      }

      const results: any[] = await someRepository.findByIds(ids);
      return ids.map(id => results.find(result => result.id === id));
    });
    this.repository = someRepository;
    this.name = name;
  }

  public async getConnection(connectionArgs: ConnectionArguments): Promise<Connection<EntityInstance>> {
    const { orderBy, filters } = connectionArgs;
    const qb = this.getQueryBuilder();
    if (orderBy) {
      const [field, direction] = orderBy.split('_');
      if (field && (direction === 'ASC' || direction === 'DESC')) {
        qb.orderBy(`${this.name}.${field}`, direction);
      }
    }

    if (filters) {
      addFunction(qb, filters, this.name, 'AND');
    }

    return runQueryBuilderAsConnection(qb, connectionArgs);
  }

  public getQueryBuilder(): SelectQueryBuilder<EntityInstance> {
    return this.repository.createQueryBuilder(this.name);
  }

  public async create(entity: EntityInstance): Promise<EntityInstance> {
    // @ts-ignore
    const newEntity = await this.repository.save(entity);
    this.cacheEntity(newEntity);
    return newEntity;
  }

  public async update(entity: EntityInstance): Promise<EntityInstance> {
    this.evictCachedEntity(entity);
    // @ts-ignore
    const updatedEntity = await this.repository.save(entity);
    this.cacheEntity(updatedEntity);
    return updatedEntity;
  }

  public async delete(entity: EntityInstance): Promise<Boolean> {
    this.evictCachedEntity(entity);
    await this.repository.remove(entity);
    return true;
  }

  public evictCachedEntity(entity: EntityInstance) {
    // @ts-ignore
    if (entity && entity.id) {
      // @ts-ignore
      this.clear(entity.id);
    }
  }

  public cacheEntity(entity: EntityInstance) {
    // @ts-ignore
    if (entity && entity.id) {
      // @ts-ignore
      this.prime(entity.id, entity);
    }
  }
}
