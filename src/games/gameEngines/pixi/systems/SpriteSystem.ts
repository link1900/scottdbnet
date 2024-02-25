import { IWorld } from "bitecs";
import { Sprite as PixiSprite } from "pixi.js";
import { buildQuery, QueryType } from "../../bitECS/queryHelper";
import { Position } from "../components/Position";
import { Rotation } from "../components/Rotation";
import { Sprite } from "../components/Sprite";
import { PixiGame } from "../PixiGame";

export function createSpriteSystem(game: PixiGame) {
  const sprites = new Map<number, PixiSprite>();
  const spriteQueryEnter = buildQuery(
    {
      sprite: Sprite,
      position: Position
    },
    QueryType.ENTER
  );

  const rotatingSpriteQuery = buildQuery({
    sprite: Sprite,
    rotation: Rotation
  });

  const spriteQueryExit = buildQuery(
    {
      sprite: Sprite,
      position: Position
    },
    QueryType.EXIT
  );

  return (world: IWorld) => {
    spriteQueryEnter(world, (entity) => {
      const sprite = PixiSprite.from(
        game.stringMap.findValueById(entity.sprite.texture) ?? ""
      );
      sprite.x = entity.position.x;
      sprite.y = entity.position.y;
      game.app.stage.addChild(sprite);
      sprites.set(entity.id, sprite);
    });

    rotatingSpriteQuery(world, (entity) => {
      const sprite = sprites.get(entity.id);
      if (sprite) {
        sprite.angle = entity.rotation.angle;
      }
    });

    spriteQueryExit(world, (entity) => {
      const sprite = sprites.get(entity.id);
      if (sprite) {
        game.app.stage.removeChild(sprite);
        sprites.delete(entity.id);
      }
    });

    return world;
  };
}
