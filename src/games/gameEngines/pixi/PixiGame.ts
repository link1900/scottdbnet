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
import { defaultsDeep } from "lodash";
import { Engine } from "matter-js";
import { Application, Ticker, Assets } from "pixi.js";
import { ApplicationOptions } from "pixi.js/lib/app/Application";
import { AssetInitOptions } from "pixi.js/lib/assets/Assets";
import { ComponentProxy } from "../bitECS/ComponentProxy";
import {
  EntityStructure,
  EntityProxy,
  entityProxyBuilder,
  EntityProxyProps
} from "../bitECS/entityHelper";
import { SystemBase } from "../bitECS/SystemBase";
import { SoundLibrary } from "@pixi/sound";

export type PixiGameOptions = {
  pixiOptions?: Partial<ApplicationOptions>;
  physicsWireframe?: boolean;
};

const defaultSettings: PixiGameOptions = {
  physicsWireframe: false,
  pixiOptions: {
    width: 640,
    height: 480
  }
};

export class PixiGame {
  world: IWorld;
  pixiApp: Application;
  private systems: SystemBase<any>[];
  gameLoopTicker: Ticker;
  matterEngine: Engine;
  settings: PixiGameOptions;
  audio: SoundLibrary = undefined as any;

  constructor(options: PixiGameOptions) {
    this.world = createWorld();
    this.pixiApp = new Application();
    this.systems = [];
    this.gameLoopTicker = new Ticker();
    this.matterEngine = Engine.create();
    this.settings = defaultsDeep(options, defaultSettings);

    this.gameLoopTicker.add((delta) => {
      Engine.update(this.matterEngine);
      this.update();
    });
  }

  async init() {
    await this.pixiApp.init(this.settings.pixiOptions);

    // importing global sound will immediately create auto contexts
    // we need to dynamically import it during init
    this.audio = (await import("@pixi/sound")).sound;

    // to prevent the page getting clicks through the canvas
    this.pixiApp.stage.eventMode = "static";
    this.pixiApp.stage.on("pointerdown", (e) => {
      e.preventDefault();
    });
  }

  async readManifest(options?: AssetInitOptions) {
    return await Assets.init(options);
  }

  async loadBundle(name: string) {
    return await Assets.loadBundle(name);
  }

  start() {
    this.gameLoopTicker.start();
  }

  stop() {
    this.gameLoopTicker.stop();
  }

  kill() {
    Engine.clear(this.matterEngine);
    this.audio.removeAll();
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
    console.log(`killed entity ${eid}`);
    return removeEcsEntity(this.world, eid);
  }

  addComponents<CS extends EntityStructure>(
    eid: number,
    componentStructure: CS,
    props?: EntityProxyProps<CS>,
    defaults?: EntityProxyProps<CS>
  ): EntityProxy<CS> {
    const components = Object.values(componentStructure);
    const entityProxy = entityProxyBuilder(componentStructure);
    components.forEach((c) => {
      addEcsComponent(this.world, c.component, eid);
    });

    entityProxy.id = eid;

    const merged = defaultsDeep(props, defaults);

    for (const prop in merged) {
      if (
        Object.prototype.hasOwnProperty.call(merged, prop) &&
        Object.prototype.hasOwnProperty.call(entityProxy, prop)
      ) {
        Object.assign(entityProxy[prop], merged[prop]);
      }
    }

    return entityProxy;
  }

  createEntity<CS extends EntityStructure>(
    componentStructure: CS,
    props?: EntityProxyProps<CS>,
    defaults?: EntityProxyProps<CS>
  ): EntityProxy<CS> {
    const newEid = this.createBaseEntity();
    return this.addComponents(newEid, componentStructure, props, defaults);
  }

  addSystem(system: any) {
    this.systems.push(system);
  }
}
