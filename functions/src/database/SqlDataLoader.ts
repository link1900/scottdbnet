import DataLoader from 'dataloader';
import { Repository, In } from 'typeorm';

export class SqlDataLoader<EntityInstance, RepositoryInstance extends Repository<EntityInstance>> extends DataLoader<
  string,
  EntityInstance
> {
  public repository: RepositoryInstance;

  constructor(someRepository: RepositoryInstance) {
    super(async (ids: string[]) => {
      if (!ids || ids.length < 1) {
        return [];
      }

      const results: any[] = await someRepository.find({ where: { id: In<string>(ids) } });
      return ids.map(id => results.find(result => result.id === id));
    });
    this.repository = someRepository;
  }

  public async create(entity: EntityInstance): Promise<EntityInstance> {
    const newEntity = await this.repository.save(entity);
    this.cacheEntity(newEntity);
    return newEntity;
  }

  public async update(entity: EntityInstance): Promise<EntityInstance> {
    this.evictCachedEntity(entity);
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
