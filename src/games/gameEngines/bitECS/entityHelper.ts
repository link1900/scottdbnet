import {
  Component,
  ComponentType,
  defineQuery,
  enterQuery,
  exitQuery,
  ISchema,
  IWorld,
  Query,
  QueryModifier
} from "bitecs";
import { PixiGame } from "../pixi/PixiGame";
import { ComponentProxy } from "./ComponentProxy";

export enum QueryType {
  STANDARD,
  ENTER,
  EXIT
}

export type EntityProxy<CS extends EntityStructure> = {
  id: number;
} & {
  [key in keyof CS]: ComponentProxyRef<CS[key]>;
};

export type EntityProxyProps<CS extends EntityStructure> = Partial<{
  [key in keyof CS]: Partial<CS[key]>;
}>;

export type ComponentProxyRef<
  C extends ComponentProxy<ComponentType<ISchema>>
> = {
  [key in keyof C]: C[key];
};

export type EntityStructure = {
  [key: string]: ComponentProxy<ComponentType<ISchema>>;
};

export type QueryRunner<ES extends EntityStructure> = {
  type: QueryType;
  iterator: (entityProxy: EntityProxy<ES>, game: PixiGame) => void;
  query: Query;
};

export function entityProxyBuilder<CS extends EntityStructure>(
  entityStructure: CS
): EntityProxy<CS> {
  const entityProxy: any = {
    _id: 0,
    get id() {
      return this._id;
    },
    set id(newId: number) {
      this._id = newId;
      Object.entries(this).forEach(([key, value]) => {
        if (key !== "id" && key !== "_id") {
          (value as any).id = newId;
        }
      });
    }
  };

  Object.entries(entityStructure).forEach(([key, value]) => {
    entityProxy[key] = value;
  });

  return entityProxy as EntityProxy<CS>;
}

export function runQuery<CS extends EntityStructure>(
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

export function buildQuery<CS extends EntityStructure>(
  type: QueryType,
  entityStructure: CS,
  modifiers: (Component | QueryModifier)[] = []
): Query {
  const components = Object.values(entityStructure).map((c) => c.component);
  const baseQuery = defineQuery([...components, ...modifiers]);
  let query = baseQuery;
  if (type === QueryType.ENTER) {
    query = enterQuery(baseQuery);
  } else {
    if (type === QueryType.EXIT) {
      query = exitQuery(baseQuery);
    }
  }
  return query;
}

export function getComponents<T, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  return keys.reduce(
    (acc, key) => {
      acc[key] = obj[key];
      return acc;
    },
    {} as Pick<T, K>
  );
}
