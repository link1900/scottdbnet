import { Sprite as PixiSprite } from "pixi.js";
import {
  EntityProxy,
  getComponents,
  QueryType
} from "../../bitECS/entityHelper";
import { SystemBase } from "../../bitECS/SystemBase";
import { pixiComponents } from "../components/pixiComponents";
import { PixiGame } from "../PixiGame";

const spriteStructure = getComponents(pixiComponents, [
  "sprite",
  "position",
  "size",
  "rotation"
]);

type Sprite = typeof spriteStructure;

function spriteCreate(entity: EntityProxy<Sprite>, game: PixiGame) {
  const sprite = PixiSprite.from(entity.sprite.texture);
  sprite.anchor.set(0.5, 0.5);
  sprite.x = entity.position.x;
  sprite.y = entity.position.y;
  sprite.width = entity.size.width;
  sprite.height = entity.size.height;
  sprite.angle = entity.rotation.angle;
  game.pixiApp.stage.addChild(sprite);
  entity.sprite.sprite = sprite;
}

function spriteRender(entity: EntityProxy<Sprite>) {
  const sprite = entity.sprite.sprite;
  if (sprite) {
    sprite.x = entity.position.x;
    sprite.y = entity.position.y;
    sprite.width = entity.size.width;
    sprite.height = entity.size.height;
    sprite.angle = entity.rotation.angle;
  }
}

function spriteDelete(entity: EntityProxy<Sprite>, game: PixiGame) {
  const sprite = entity.sprite.sprite;
  if (sprite) {
    game.pixiApp.stage.removeChild(sprite);
    entity.sprite.sprite = null;
  }
}

export class SpriteSystem extends SystemBase<Sprite> {
  constructor(game: PixiGame) {
    super(game, spriteStructure);
    this.addQuery(spriteCreate, QueryType.ENTER);
    this.addQuery(spriteRender, QueryType.STANDARD);
    this.addQuery(spriteDelete, QueryType.EXIT);
  }
}
