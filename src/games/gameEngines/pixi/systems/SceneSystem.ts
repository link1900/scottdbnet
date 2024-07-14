import { Container } from "pixi.js";
import { QueryType } from "../../bitECS/entityHelper";
import { SystemBase } from "../../bitECS/SystemBase";
import { SceneEntity, sceneFields, SceneFields } from "../entities/SceneEntity";
import { PixiGame } from "../PixiGame";

function sceneCreate(entity: SceneEntity, game: PixiGame) {
  const container = new Container();
  entity.container.container = container;
  sceneRender(entity);
  game.pixiApp.stage.addChild(container);
  console.log("created container");
}

function sceneRender(entity: SceneEntity) {
  const container = entity.container.container;
  if (container) {
    container.visible = entity.display.visible;
    container.x = entity.position.x;
    container.y = entity.position.y;
    container.width = entity.size.width;
    container.height = entity.size.height;
  }
}

function sceneDelete(entity: SceneEntity, game: PixiGame) {
  const scene = entity.container.container;
  if (scene) {
    game.pixiApp.stage.removeChild(scene);
    entity.container.container?.destroy();
    entity.container.container = null;
  }
}

export class SceneSystem extends SystemBase<SceneFields> {
  constructor(game: PixiGame) {
    super(game, sceneFields);
    this.addQuery(sceneCreate, QueryType.ENTER);
    this.addQuery(sceneRender, QueryType.STANDARD);
    this.addQuery(sceneDelete, QueryType.EXIT);
  }
}
