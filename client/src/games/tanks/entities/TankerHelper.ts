import { addComponent, addEntity, IWorld } from "bitecs";
import { Move } from "../components/Move";
import { Position } from "../components/Position";
import { Rotation } from "../components/Rotation";
import { Sprite, SpriteType } from "../components/Sprite";
import { Velocity } from "../components/Velocity";
import { Textures } from "../util/textureHelper";

export function createTank(
  world: IWorld,
  props: { texture: Textures; x: number; y: number }
) {
  const tank = addEntity(world);
  addComponent(world, Position, tank);
  Position.x[tank] = props.x;
  Position.y[tank] = props.y;
  addComponent(world, Rotation, tank);

  addComponent(world, Move, tank);
  addComponent(world, Velocity, tank);
  Velocity.x[tank] = 0;
  Velocity.y[tank] = 0;

  addComponent(world, Sprite, tank);
  Sprite.texture[tank] = props.texture;
  Sprite.type[tank] = SpriteType.ARCADE;
  return tank;
}
