import { defineSystem, defineQuery } from "bitecs";
import { Direction, Move } from "../components/Move";
import { Position } from "../components/Position";
import { Rotation } from "../components/Rotation";
import { Velocity } from "../components/Velocity";

export const createMovementSystem = () => {
  const query = defineQuery([Velocity, Position, Rotation, Move]);
  const speed = 200;
  return defineSystem((world) => {
    const entities = query(world);
    for (let i = 0; i < entities.length; i++) {
      const id = entities[i];

      const direction = Move.direction[id];

      switch (direction) {
        case Direction.None:
          Velocity.x[id] = 0;
          Velocity.y[id] = 0;
          break;
        case Direction.Left:
          Velocity.x[id] = -speed;
          Velocity.y[id] = 0;
          Rotation.angle[id] = 90;
          break;
        case Direction.Right:
          Velocity.x[id] = speed;
          Velocity.y[id] = 0;
          Rotation.angle[id] = 270;
          break;
        case Direction.Up:
          Velocity.x[id] = 0;
          Velocity.y[id] = -speed;
          Rotation.angle[id] = 180;
          break;
        case Direction.Down:
          Velocity.x[id] = 0;
          Velocity.y[id] = speed;
          Rotation.angle[id] = 0;
          break;
      }

      // Position.x[id] += Velocity.x[id];
      // Position.y[id] += Velocity.y[id];
    }

    return world;
  });
};
