import { addComponent, IWorld } from "bitecs";
import Phaser from "phaser";
import { Bot } from "../components/Bot";
import { Textures } from "../util/textureHelper";
import { createTank } from "./TankerHelper";

export function createBot(
  world: IWorld,
  props: { texture: Textures; x: number; y: number }
) {
  const botTank = createTank(world, props);

  addComponent(world, Bot, botTank);
  Bot.timeBetweenActions[botTank] = Phaser.Math.Between(100, 500);

  return botTank;
}
