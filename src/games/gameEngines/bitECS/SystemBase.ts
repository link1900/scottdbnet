import { Component, IWorld, QueryModifier } from "bitecs";
import { PixiGame } from "../pixi/PixiGame";
import {
  buildQuery,
  EntityProxy,
  entityProxyBuilder,
  EntityStructure,
  QueryRunner,
  QueryType,
  runQuery
} from "./entityHelper";

export class SystemBase<ES extends EntityStructure> {
  entityStructure: ES;
  entityProxy: EntityProxy<ES>;
  game: PixiGame;
  queries: QueryRunner<ES>[];

  constructor(game: PixiGame, entityStructure: ES) {
    this.game = game;
    this.entityStructure = entityStructure;
    this.entityProxy = entityProxyBuilder(entityStructure);
    this.queries = [];
  }

  addQuery(
    iterator: (entityProxy: EntityProxy<ES>, game: PixiGame) => void,
    type: QueryType = QueryType.STANDARD,
    modifiers: (Component | QueryModifier)[] = []
  ) {
    this.queries.push({
      iterator,
      type,
      query: buildQuery(type, this.entityStructure, modifiers)
    });
  }

  run(world: IWorld) {
    this.queries.forEach((runner) => {
      runQuery(world, runner.query, this.entityProxy, (e) => {
        runner.iterator(e, this.game);
      });
    });
    return world;
  }
}
