import { base64Decode, base64Encode, objectToString, stringToObject } from '../util/stringHelper';
import InternalServerError from '../error/InternalServerError';
import { Connection, ConnectionArguments } from './graphqlSchemaTypes';
import { SelectQueryBuilder } from 'typeorm';
import { isNil, reverse, get, set } from 'lodash';
import UserInputError from '../error/UserInputError';
import { InvalidFieldReason } from '../error/InvalidFieldReason';
import { BaseModel } from '../database/BaseModel';
import { unwrap } from '../util/objectHelper';

function encodeCursor(value?: { [key: string]: any }): string {
  if (!value) {
    throw new InternalServerError('Failed trying to encode cursor for graphql relay connection');
  }
  return base64Encode(objectToString(value));
}

function decodeCursor(cursor?: string): { [key: string]: any } {
  if (!cursor) {
    throw new InternalServerError('Invalid cursor provided for graphql relay connection');
  }
  return stringToObject(base64Decode(cursor));
}

const emptyConnection = {
  pageInfo: {
    hasNextPage: false,
    hasPreviousPage: false
  },
  edges: []
};

type QueryOrder = 'ASC' | 'DESC';

function getSortOrderForQueryBuilder<T>(queryBuilder: SelectQueryBuilder<T>): QueryOrder {
  const orderByKeys = Object.keys(queryBuilder.expressionMap.orderBys);
  const order = queryBuilder.expressionMap.orderBys[orderByKeys[0]];
  if (order === 'ASC') {
    return 'ASC';
  }
  return 'DESC';
}

function verifyAllOrderBysAreSame<T>(queryBuilder: SelectQueryBuilder<T>): boolean {
  const firstSort = getSortOrderForQueryBuilder(queryBuilder);
  const orderByKeys = Object.keys(queryBuilder.expressionMap.orderBys);
  const result = orderByKeys.every(key => queryBuilder.expressionMap.orderBys[key] === firstSort);
  if (!result) {
    throw new InternalServerError('Cannot page query as all order bys must have a consistent sort direction');
  }
  return result;
}

function buildCursorForQueryAndNode<T>(queryBuilder: SelectQueryBuilder<T>, node: any): { [key: string]: any } {
  const orderByKeys = Object.keys(queryBuilder.expressionMap.orderBys);
  const name = getNameForQueryBuilder(queryBuilder);
  return orderByKeys.reduce((ob, key) => {
    const cleanKey = key.replace(`${name}.`, '');
    return {
      ...ob,
      [cleanKey]: get(node, cleanKey)
    };
  }, {});
}

function flipOrder(order: QueryOrder): QueryOrder {
  if (order === 'ASC') {
    return 'DESC';
  }

  return 'ASC';
}

function flippedOrderBy<T>(queryBuilder: SelectQueryBuilder<T>): { [key: string]: any } {
  const firstSort = getSortOrderForQueryBuilder(queryBuilder);
  const flippedSort = flipOrder(firstSort);
  const orderByKeys = Object.keys(queryBuilder.expressionMap.orderBys);
  return orderByKeys.reduce((ob, key) => {
    set(ob, key, flippedSort);
    return ob;
  }, {});
}

function getNameForQueryBuilder<T>(queryBuilder: SelectQueryBuilder<T>): string {
  if (!queryBuilder.expressionMap.mainAlias) {
    return '';
  }
  return queryBuilder.expressionMap.mainAlias.name;
}

export async function runQueryBuilderAsConnection<T extends BaseModel>(
  queryBuilder: SelectQueryBuilder<T>,
  args: ConnectionArguments
): Promise<Connection<T>> {
  let limit: number = 10;
  const name = getNameForQueryBuilder(queryBuilder);
  const hasFirst = !isNil(args.first);
  const hasLast = !isNil(args.last);
  const hasBefore = !isNil(args.before);
  const hasAfter = !isNil(args.after);
  const isReversed = (hasBefore || hasLast) && !hasFirst;

  if (hasFirst && (typeof args.first !== 'number' || args.first < 0)) {
    throw new UserInputError('args.first must be a positive integer', 'args.first', InvalidFieldReason.INVALID);
  }

  if (hasLast && (typeof args.last !== 'number' || args.last < 0)) {
    throw new UserInputError('args.last must be a positive integer', 'args.last', InvalidFieldReason.INVALID);
  }

  if (hasLast && hasFirst) {
    throw new UserInputError('Cannot provide both first and last arguments.', 'args', InvalidFieldReason.REQUIRED);
  }

  // get sortDirection from first order by or default to asc
  const sortDirection: QueryOrder = getSortOrderForQueryBuilder(queryBuilder);

  // must always order by id field
  const orderBys = Object.keys(queryBuilder.expressionMap.orderBys);
  const foundIdOrder = orderBys.find(orderBy => orderBy === 'id');
  if (!foundIdOrder) {
    queryBuilder.addOrderBy('id', sortDirection);
  }

  verifyAllOrderBysAreSame(queryBuilder);

  if (hasAfter) {
    const cursor = decodeCursor(args.after);
    const operator = sortDirection === 'ASC' ? '>' : '<';
    const columnNames = Object.keys(cursor);
    const sortColumns = columnNames.map(columnName => `${name}.${columnName}`);
    const valueParamNames = columnNames.map(columnName => `:${columnName}`);
    queryBuilder.andWhere(`(${sortColumns.join(', ')}) ${operator} (${valueParamNames.join(', ')})`, cursor);
  }

  if (hasBefore) {
    const cursor = decodeCursor(args.before);
    const operator = sortDirection === 'DESC' ? '>' : '<';
    const columnNames = Object.keys(cursor);
    const sortColumns = columnNames.map(columnName => `${name}.${columnName}`);
    const valueParamNames = columnNames.map(columnName => `:${columnName}`);
    queryBuilder.andWhere(`(${sortColumns.join(', ')}) ${operator} (${valueParamNames.join(', ')})`, cursor);
  }

  // work out the correct limit size from the args
  if (hasFirst) {
    limit = unwrap(args.first);
  }

  if (hasLast) {
    limit = unwrap(args.last);
  }

  if (limit === 0) {
    return emptyConnection;
  }

  // work out the sort
  if (isReversed) {
    queryBuilder.orderBy(flippedOrderBy(queryBuilder));
  }

  // apply limit
  queryBuilder.take(limit + 1);

  // run the constructed query
  // we are fetching one extra edge to see if there are more results
  let entities = await queryBuilder.getMany();
  if (entities.length === 0) {
    return emptyConnection;
  }

  const hasMore = limit ? entities.length > limit : false;
  if (hasMore) {
    // this is to remove the entity that was over-fetched
    entities.pop();
  }

  // flip results if we are paging backwards
  if (isReversed) {
    entities = reverse(entities);
  }

  // convert results to relay edges and nodes
  const edges = entities.map(entity => ({
    cursor: encodeCursor(buildCursorForQueryAndNode(queryBuilder, entity)),
    node: entity
  }));

  return {
    pageInfo: {
      hasNextPage: hasMore && hasFirst ? true : false,
      hasPreviousPage: hasMore && hasLast ? true : false
    },
    edges
  };
}

export function addWhereClause<T>(
  qb: SelectQueryBuilder<T>,
  whereFunction: 'andWhere' | 'orWhere',
  index: number,
  name: string,
  key: string,
  value: string
) {
  const [field, type] = key.split('_');
  const fieldValue = `field${index}`;
  const fieldName = `${name}.${field}`;
  if (type === 'equal') {
    qb[whereFunction](`${fieldName} = :${fieldValue}`, { [fieldValue]: value });
  }

  if (type === 'not') {
    qb[whereFunction](`${fieldName} <> :${fieldValue}`, { [fieldValue]: value });
  }

  if (type === 'in') {
    qb[whereFunction](`${fieldName} IN (:...${fieldValue})`, { [fieldValue]: value });
  }

  if (type === 'notIn') {
    qb[whereFunction](`${fieldName} NOT IN (:...${fieldValue})`, { [fieldValue]: value });
  }

  if (type === 'lt') {
    qb[whereFunction](`${fieldName} < :${fieldValue}`, { [fieldValue]: value });
  }

  if (type === 'lte') {
    qb[whereFunction](`${fieldName} <= :${fieldValue}`, { [fieldValue]: value });
  }

  if (type === 'gt') {
    qb[whereFunction](`${fieldName} > :${fieldValue}`, { [fieldValue]: value });
  }

  if (type === 'gte') {
    qb[whereFunction](`${fieldName} >= :${fieldValue}`, { [fieldValue]: value });
  }

  if (type === 'contains') {
    qb[whereFunction](`${fieldName} LIKE :${fieldValue}`, { [fieldValue]: `%${value}%` });
  }

  if (type === 'notContains') {
    qb[whereFunction](`${fieldName} NOT LIKE :${fieldValue}`, { [fieldValue]: `%${value}%` });
  }

  if (type === 'startsWith') {
    qb[whereFunction](`${fieldName} LIKE :${fieldValue}`, { [fieldValue]: `${value}%` });
  }

  if (type === 'notStartsWith') {
    qb[whereFunction](`${fieldName} NOT LIKE :${fieldValue}`, { [fieldValue]: `${value}%` });
  }

  if (type === 'endsWith') {
    qb[whereFunction](`${fieldName} LIKE :${fieldValue}`, { [fieldValue]: `%${value}` });
  }

  if (type === 'notEndsWith') {
    qb[whereFunction](`${fieldName} NOT LIKE :${fieldValue}`, { [fieldValue]: `%${value}` });
  }
}

export function addFunction<T>(queryBuilder: SelectQueryBuilder<T>, filters: any, name: string, type: 'AND' | 'OR') {
  const filterKeys = Object.keys(filters);
  filterKeys.forEach((key, index) => {
    const value = filters[key];

    if (key === 'AND' || key === 'OR') {
      value.forEach((queryPart: any) => addFunction(queryBuilder, queryPart, name, key));
    }

    if (type === 'AND') {
      addWhereClause(queryBuilder, 'andWhere', index, name, key, value);
    }

    if (type === 'OR') {
      addWhereClause(queryBuilder, 'orWhere', index, name, key, value);
    }
  });
}
