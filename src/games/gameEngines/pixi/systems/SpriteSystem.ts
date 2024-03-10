import { IWorld } from "bitecs";
import { Sprite as PixiSprite } from "pixi.js";
import { buildQuery, QueryType } from "../../bitECS/queryHelper";
import { Position } from "../components/Position";
import { Rotation } from "../components/Rotation";
import { Size } from "../components/Size";
import { Sprite } from "../components/Sprite";
import { PixiGame } from "../PixiGame";

export function createSpriteSystem(game: PixiGame) {
  const sprites = new Map<number, PixiSprite>();
  const spriteQueryEnter = buildQuery(
    {
      sprite: Sprite,
      position: Position,
      size: Size,
      rotation: Rotation
    },
    QueryType.ENTER
  );

  const spriteQueryRender = buildQuery({
    sprite: Sprite,
    position: Position,
    size: Size,
    rotation: Rotation
  });

  const spriteQueryExit = buildQuery(
    {
      sprite: Sprite
    },
    QueryType.EXIT
  );

  return (world: IWorld) => {
    spriteQueryEnter(world, (entity) => {
      const sprite = PixiSprite.from(
        game.getAssetString(entity.sprite.texture)
      );
      sprite.anchor.set(0.5, 0.5);
      sprite.x = entity.position.x;
      sprite.y = entity.position.y;
      sprite.width = entity.size.width;
      sprite.height = entity.size.height;
      sprite.angle = entity.rotation.angle;
      game.pixiApp.stage.addChild(sprite);
      sprites.set(entity.id, sprite);
    });

    spriteQueryRender(world, (entity) => {
      const sprite = sprites.get(entity.id);
      if (sprite) {
        sprite.x = entity.position.x;
        sprite.y = entity.position.y;
        sprite.width = entity.size.width;
        sprite.height = entity.size.height;
        sprite.angle = entity.rotation.angle;
      }
    });

    spriteQueryExit(world, (entity) => {
      const sprite = sprites.get(entity.id);
      if (sprite) {
        game.pixiApp.stage.removeChild(sprite);
        sprites.delete(entity.id);
      }
    });

    return world;
  };
}
