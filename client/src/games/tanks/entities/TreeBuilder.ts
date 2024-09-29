import { addComponent, addEntity, IWorld } from "bitecs";
import { Position } from "../components/Position";
import { Sprite, SpriteType } from "../components/Sprite";
import { Textures } from "../util/textureHelper";

export function createTree(
  world: IWorld,
  props: { texture: Textures; x: number; y: number }
) {
  const largeTree = addEntity(world);
  addComponent(world, Position, largeTree);
  addComponent(world, Sprite, largeTree);
  Position.x[largeTree] = props.x;
  Position.y[largeTree] = props.y;
  Sprite.texture[largeTree] = props.texture;
  Sprite.type[largeTree] = SpriteType.STATIC;
  return largeTree;
}
