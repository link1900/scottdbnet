import { IApplicationOptions } from "@pixi/app/lib/Application";
import {
  createWorld,
  IWorld,
  System,
  addEntity as addEcsEntity,
  addComponent as addEcsComponent
} from "bitecs";
import { Application, Assets, Ticker } from "pixi.js";
import {
  ComponentStructure,
  EntityProxy,
  entityProxyBuilder
} from "../bitECS/proxyHelper";
import { StringMap } from "../bitECS/StringMap";

export type PixiGame = {
  world: IWorld;
  app: Application;
  systems: System[];
  gameLoopTicker: Ticker;
  stringMap: StringMap;
  setup: () => void;
  start: () => void;
  stop: () => void;
  update: () => void;
  createEntity: () => number;
  addComponents: <CS extends ComponentStructure>(
    eid: number,
    componentStructure: CS
  ) => EntityProxy<CS>;
  loadSpriteSheet: (assetUrl: string) => Promise<void>;
};

export type PixiGameOptions = {
  appOptions?: Partial<IApplicationOptions>;
  init?: () => void;
  setup?: () => void;
};

export function noOp() {}

export function createPixiGame(options: PixiGameOptions): PixiGame {
  const world = createWorld();
  const app = new Application(options.appOptions);
  const systems: System[] = [];
  const gameLoopTicker = new Ticker();
  const stringMap = new StringMap();

  const setup = options.setup ?? noOp;

  const start = () => {
    gameLoopTicker.start();
  };

  const stop = () => {
    gameLoopTicker.stop();
  };

  const update = () => {
    systems.forEach((system) => system(world));
  };

  gameLoopTicker.add((delta) => {
    update();
  });

  const createEntity = () => {
    return addEcsEntity(world);
  };

  const addComponents = <CS extends ComponentStructure>(
    eid: number,
    componentStructure: CS
  ): EntityProxy<CS> => {
    const components = Object.values(componentStructure);
    const entityProxy = entityProxyBuilder(componentStructure);
    components.forEach((c) => {
      addEcsComponent(world, c, eid);
    });

    entityProxy.id = eid;

    return entityProxy;
  };

  const loadSpriteSheet = async (assetUrl: string) => {
    const spriteSheet = await Assets.load(assetUrl);
    stringMap.addEntries(Object.keys(spriteSheet.textures));
  };

  return {
    world,
    app,
    systems,
    gameLoopTicker,
    stringMap,

    setup,
    start,
    stop,
    update,
    createEntity,
    addComponents,
    loadSpriteSheet
  };
}
