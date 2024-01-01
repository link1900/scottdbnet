import { defineSystem } from "bitecs";
import { buildQuery, QueryType } from "../../gameEngines/bitECS/queryHelper";
import { Position } from "../components/Position";
import { Rotation } from "../components/Rotation";
import { Sprite, SpriteType } from "../components/Sprite";
import { Velocity } from "../components/Velocity";

export const createSpriteSystem = (
  group: Phaser.Physics.Arcade.Group,
  textures: string[]
) => {
  const sprites = new Map<number, Phaser.Physics.Arcade.Sprite>();
  const spriteQueryEnter = buildQuery(
    {
      sprite: Sprite,
      position: Position
    },
    QueryType.ENTER
  );

  const movingSpriteQuery = buildQuery({
    sprite: Sprite,
    position: Position,
    velocity: Velocity,
    rotation: Rotation
  });

  const spriteQueryExit = buildQuery(
    {
      sprite: Sprite,
      position: Position
    },
    QueryType.EXIT
  );

  return defineSystem((world) => {
    spriteQueryEnter(world, (entity) => {
      const texture = textures[entity.sprite.texture];
      const sprite = group.get(
        entity.position.x,
        entity.position.y,
        "tankers",
        texture
      );
      if (entity.sprite.type === SpriteType.STATIC) {
        sprite.setImmovable(true);
      }
      sprite.setBounce(0.2);
      sprite.setCollideWorldBounds(true);
      sprites.set(entity.id, sprite);
    });

    movingSpriteQuery(world, (entity) => {
      const sprite = sprites.get(entity.id);
      if (sprite) {
        sprite.setVelocity(entity.velocity.x, entity.velocity.y);
        sprite.angle = entity.rotation.angle;
      }
    });

    spriteQueryExit(world, (entity) => {
      const sprite = sprites.get(entity.id);
      if (sprite) {
        group.killAndHide(sprite);
        sprites.delete(entity.id);
      }
    });

    return world;
  });
};
