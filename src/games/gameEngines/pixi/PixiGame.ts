import {
  createWorld,
  IWorld,
  addEntity as addEcsEntity,
  removeEntity as removeEcsEntity,
  addComponent as addEcsComponent,
  removeComponent as removeEcsComponent,
  ComponentType,
  ISchema
} from "bitecs";
import { Engine } from "matter-js";
import { Application, Assets, Ticker } from "pixi.js";
import { ApplicationOptions } from "pixi.js/lib/app/Application";
import { ComponentProxy } from "../bitECS/ComponentProxy";
import {
  EntityStructure,
  EntityProxy,
  entityProxyBuilder,
  EntityProxyProps
} from "../bitECS/entityHelper";
import { SystemBase } from "../bitECS/SystemBase";

export type PixiGameSettings = {
  physicsWireframe: boolean;
};

export type PixiGameOptions = {
  pixiOptions?: Partial<ApplicationOptions>;
  init?: () => void;
  settings?: Partial<PixiGameSettings>;
};

const defaultSettings: PixiGameSettings = {
  physicsWireframe: false
};

export class PixiGame {
  world: IWorld;
  pixiApp: Application;
  private systems: SystemBase<any>[];
  gameLoopTicker: Ticker;
  matterEngine: Engine;
  settings: PixiGameSettings;
  pixiOptions?: Partial<ApplicationOptions>;

  constructor(options: PixiGameOptions) {
    this.world = createWorld();
    this.pixiApp = new Application();
    this.systems = [];
    this.gameLoopTicker = new Ticker();
    this.matterEngine = Engine.create();
    this.settings = {
      ...defaultSettings,
      ...options.settings
    };
    this.pixiOptions = options.pixiOptions;

    this.gameLoopTicker.add((delta) => {
      Engine.update(this.matterEngine);
      this.update();
    });
  }

  async init() {
    await this.pixiApp.init(this.pixiOptions);
  }

  start() {
    this.gameLoopTicker.start();
  }

  stop() {
    this.gameLoopTicker.stop();
  }

  kill() {
    Engine.clear(this.matterEngine);
    this.pixiApp.destroy(true);
  }

  update() {
    this.systems.forEach((system) => system.run(this.world));
  }

  addComponent<CS extends EntityStructure>(
    entity: EntityProxy<CS>,
    componentProxy: ComponentProxy<ComponentType<ISchema>>
  ) {
    addEcsComponent(this.world, componentProxy.component, entity.id);
  }

  removeComponent<CS extends EntityStructure>(
    entity: EntityProxy<CS>,
    componentProxy: ComponentProxy<ComponentType<ISchema>>
  ) {
    removeEcsComponent(this.world, componentProxy.component, entity.id);
  }

  createBaseEntity() {
    return addEcsEntity(this.world);
  }

  killEntity(eid: number) {
    return removeEcsEntity(this.world, eid);
  }

  addComponents<CS extends EntityStructure>(
    eid: number,
    componentStructure: CS,
    props?: EntityProxyProps<CS>
  ): EntityProxy<CS> {
    const components = Object.values(componentStructure);
    const entityProxy = entityProxyBuilder(componentStructure);
    components.forEach((c) => {
      addEcsComponent(this.world, c.component, eid);
    });

    entityProxy.id = eid;

    for (const prop in props) {
      if (
        Object.prototype.hasOwnProperty.call(props, prop) &&
        Object.prototype.hasOwnProperty.call(entityProxy, prop)
      ) {
        Object.assign(entityProxy[prop], props[prop]);
      }
    }

    return entityProxy;
  }

  createEntity<CS extends EntityStructure>(
    componentStructure: CS,
    props?: EntityProxyProps<CS>
  ): EntityProxy<CS> {
    const newEid = this.createBaseEntity();
    return this.addComponents(newEid, componentStructure, props);
  }

  addSystem(system: any) {
    this.systems.push(system);
  }

  async loadSpriteSheet(assetUrl: string) {
    await Assets.load(assetUrl);
  }
}
