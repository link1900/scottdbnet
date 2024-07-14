import { addComponent, IWorld } from "bitecs";
import { Player } from "../components/Player";
import { Textures } from "../util/textureHelper";
import { createTank } from "./TankerHelper";

export function createPlayer(
  world: IWorld,
  props: { texture: Textures; x: number; y: number }
) {
  const player = createTank(world, props);

  addComponent(world, Player, player);

  return player;
}
