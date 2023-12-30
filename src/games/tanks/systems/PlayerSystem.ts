import Phaser from "phaser";
import { defineSystem, defineQuery } from "bitecs";
import { Player } from "../components/Player";
import { Direction, Move } from "../components/Move";

export const createPlayerSystem = (
  cursors: Phaser.Types.Input.Keyboard.CursorKeys
) => {
  const query = defineQuery([Player, Move]);

  return defineSystem((world) => {
    const entities = query(world);
    for (let i = 0; i < entities.length; i++) {
      const id = entities[i];
      if (cursors.left.isDown) {
        Move.direction[id] = Direction.Left;
      } else if (cursors.right.isDown) {
        Move.direction[id] = Direction.Right;
      } else if (cursors.up.isDown) {
        Move.direction[id] = Direction.Up;
      } else if (cursors.down.isDown) {
        Move.direction[id] = Direction.Down;
      } else {
        Move.direction[id] = Direction.None;
      }
    }
    return world;
  });
};
