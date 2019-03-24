import ServerContext from '../../server/ServerContext';
import { exists } from '../../util/objectHelper';

export async function doesGreyhoundNameExist(
  context: ServerContext,
  name: string,
  ignoreId?: string
): Promise<boolean> {
  const queryBuilder = context.loaders.greyhound.getQueryBuilder();
  queryBuilder.andWhere('greyhound.name = :name', { name });
  if (ignoreId) {
    queryBuilder.andWhere('greyhound.id <> :id', { id: ignoreId });
  }
  const foundGreyhounds = await queryBuilder.getOne();
  return exists(foundGreyhounds);
}
