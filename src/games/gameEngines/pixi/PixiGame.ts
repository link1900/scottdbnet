import { IApplicationOptions } from "@pixi/app/lib/Application";
import {
  createWorld,
  IWorld,
  System,
  addEntity as addEcsEntity,
  removeEntity as removeEcsEntity,
  addComponent as addEcsComponent
} from "bitecs";
import { Engine } from "matter-js";
import { Application, Assets, Ticker } from "pixi.js";
import {
  ComponentStructure,
  EntityProxy,
  entityProxyBuilder
} from "../bitECS/proxyHelper";
import { StringMap } from "./helpers/StringMap";

export type PixiGame = {
  world: IWorld;
  pixiApp: Application;
  systems: System[];
  gameLoopTicker: Ticker;
  matterEngine: Engine;

  start: () => void;
  stop: () => void;
  kill: () => void;
  update: () => void;
  createBaseEntity: () => number;
  createEntity: <CS extends ComponentStructure>(
    componentStructure: CS
  ) => EntityProxy<CS>;
  killEntity: (eid: number) => void;
  addComponents: <CS extends ComponentStructure>(
    eid: number,
    componentStructure: CS
  ) => EntityProxy<CS>;
  loadSpriteSheet: (assetUrl: string) => Promise<void>;
  getColorValue: (colorString?: string) => number;
  getColorString: (colorValue: number) => string;
  getAssetValue: (assetString?: string) => number;
  getAssetString: (assetValue: number) => string;

  settings: PixiGameSettings;
};

export type PixiGameSettings = {
  physicsWireframe: boolean;
};

export type PixiGameOptions = {
  pixiOptions?: Partial<IApplicationOptions>;
  init?: () => void;
  settings?: Partial<PixiGameSettings>;
};

const defaultSettings: PixiGameSettings = {
  physicsWireframe: false
};

export function createPixiGame(
  container: any,
  options: PixiGameOptions
): PixiGame {
  const world = createWorld();
  const pixiApp = new Application(options.pixiOptions);
  const systems: System[] = [];
  const gameLoopTicker = new Ticker();
  const matterEngine = Engine.create();
  const colorMap = new StringMap();
  const assetMap = new StringMap();

  container.appendChild(pixiApp.view);

  const start = () => {
    gameLoopTicker.start();
  };

  const stop = () => {
    gameLoopTicker.stop();
  };

  const kill = () => {
    Engine.clear(matterEngine);
    pixiApp.destroy(true);
  };

  const update = () => {
    systems.forEach((system) => system(world));
  };

  gameLoopTicker.add((delta) => {
    Engine.update(matterEngine);
    update();
  });

  const createBaseEntity = () => {
    return addEcsEntity(world);
  };

  const killEntity = (eid: number) => {
    return removeEcsEntity(world, eid);
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

  const createEntity = <CS extends ComponentStructure>(
    componentStructure: CS
  ): EntityProxy<CS> => {
    const newEid = createBaseEntity();
    return addComponents(newEid, componentStructure);
  };

  const loadSpriteSheet = async (assetUrl: string) => {
    await Assets.load(assetUrl);
  };

  const getColorValue = (colorString?: string): number => {
    return colorMap.addValue(colorString ?? "#ffffff");
  };

  const getColorString = (colorValue: number): string => {
    return colorMap.getValue(colorValue) ?? "#ffffff";
  };

  const getAssetValue = (assetString?: string): number => {
    return assetMap.addValue(assetString ?? "");
  };

  const getAssetString = (assetValue: number): string => {
    return assetMap.getValue(assetValue) ?? "";
  };

  return {
    world,
    pixiApp: pixiApp,
    systems,
    gameLoopTicker,
    matterEngine,

    start,
    stop,
    kill,
    update,
    createBaseEntity,
    createEntity,
    killEntity,
    addComponents,
    loadSpriteSheet,
    getColorValue,
    getColorString,
    getAssetValue,
    getAssetString,

    settings: {
      ...defaultSettings,
      ...options.settings
    }
  };
}
