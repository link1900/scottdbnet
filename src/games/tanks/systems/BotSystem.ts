import Phaser from "phaser";
import { defineSystem, defineQuery } from "bitecs";
import { Bot } from "../components/Bot";
import { Direction, Move } from "../components/Move";

export const createBotSystem = (scene: Phaser.Scene) => {
  const query = defineQuery([Bot, Move]);

  return defineSystem((world) => {
    const dt = scene.game.loop.delta;
    const entities = query(world);
    for (let i = 0; i < entities.length; i++) {
      const id = entities[i];
      Bot.accumulatedTime[id] += dt;
      if (Bot.accumulatedTime[id] < Bot.timeBetweenActions[id]) {
        continue;
      }
      Bot.accumulatedTime[id] = 0;
      const rand = Phaser.Math.Between(0, 20);
      switch (rand) {
        case 0:
          Move.direction[id] = Direction.Left;
          break;
        case 1:
          Move.direction[id] = Direction.Right;
          break;
        case 2:
          Move.direction[id] = Direction.Up;
          break;
        case 3:
          Move.direction[id] = Direction.Down;
          break;
        default:
          Move.direction[id] = Direction.None;
          break;
      }
    }
    return world;
  });
};
