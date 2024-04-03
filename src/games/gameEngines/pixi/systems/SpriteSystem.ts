import { Sprite as PixiSprite } from "pixi.js";
import { getEntity, QueryType } from "../../bitECS/entityHelper";
import { SystemBase } from "../../bitECS/SystemBase";
import { sceneFields } from "../entities/SceneEntity";
import {
  SpriteEntity,
  spriteFields,
  SpriteFields
} from "../entities/SpriteEntity";
import { PixiGame } from "../PixiGame";

function spriteCreate(entity: SpriteEntity, game: PixiGame) {
  const sprite = PixiSprite.from(entity.sprite.texture);
  entity.sprite.sprite = sprite;
  sprite.anchor.set(0.5, 0.5);
  if (entity.parent.ref !== 0) {
    getEntity(entity.parent.ref, sceneFields).container.container?.addChild(
      sprite
    );
  } else {
    game.pixiApp.stage.addChild(sprite);
  }
  spriteRender(entity);
}

function spriteRender(entity: SpriteEntity) {
  const sprite = entity.sprite.sprite;
  if (sprite) {
    sprite.x = entity.position.x;
    sprite.y = entity.position.y;
    sprite.width = entity.size.width;
    sprite.height = entity.size.height;
    sprite.angle = entity.rotation.angle;
  }
}

function spriteDelete(entity: SpriteEntity) {
  const sprite = entity.sprite.sprite;
  if (sprite) {
    entity.sprite.sprite?.destroy();
    entity.sprite.sprite = null;
  }
}

export class SpriteSystem extends SystemBase<SpriteFields> {
  constructor(game: PixiGame) {
    super(game, spriteFields);
    this.addQuery(spriteCreate, QueryType.ENTER);
    this.addQuery(spriteRender, QueryType.STANDARD);
    this.addQuery(spriteDelete, QueryType.EXIT);
  }
}
