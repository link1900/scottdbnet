import {
  Component,
  defineQuery,
  enterQuery,
  exitQuery,
  IWorld,
  Query,
  QueryModifier
} from "bitecs";
import {
  ComponentStructure,
  EntityProxy,
  entityProxyBuilder
} from "./proxyHelper";

export type QueryIterator<CS extends ComponentStructure> = (
  world: IWorld,
  iterator: (entityProxy: EntityProxy<CS>) => void
) => void;

export enum QueryType {
  STANDARD,
  ENTER,
  EXIT
}

export function runQuery<CS extends ComponentStructure>(
  world: IWorld,
  query: Query,
  entityProxy: EntityProxy<CS>,
  iterator: (entityProxy: EntityProxy<CS>) => void
) {
  const entities = query(world);
  const len = entities.length;
  for (let i = 0; i < len; i++) {
    entityProxy.id = entities[i];
    iterator(entityProxy);
  }
}

export function buildQuery<CS extends ComponentStructure>(
  componentStructure: CS,
  type: QueryType = QueryType.STANDARD,
  modifiers: (Component | QueryModifier)[] = []
): QueryIterator<CS> {
  const components = Object.values(componentStructure);
  const query = defineQuery([...components, ...modifiers]);
  let queryRun = query;
  if (type === QueryType.ENTER) {
    queryRun = enterQuery(query);
  } else {
    if (type === QueryType.EXIT) {
      queryRun = exitQuery(query);
    }
  }

  const entityProxy = entityProxyBuilder(componentStructure);

  return (world, iterator) => runQuery(world, queryRun, entityProxy, iterator);
}
