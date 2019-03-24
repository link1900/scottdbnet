import ServerContext from '../../server/ServerContext';
import { exists } from '../../util/objectHelper';
import UserInputError from '../../error/UserInputError';
import { InvalidFieldReason } from '../../error/InvalidFieldReason';

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

export async function checkIfGreyhoundNameExists(context: ServerContext, name: string, ignoreId?: string) {
  const nameAlreadyExists = await doesGreyhoundNameExist(context, name, ignoreId);
  if (nameAlreadyExists) {
    throw new UserInputError(`greyhound with name ${name} already exists`, 'name', InvalidFieldReason.INVALID);
  }
}
