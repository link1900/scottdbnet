import { defineSystem } from "bitecs";
import { buildQuery } from "../../gameEngines/bitECS/queryHelper";
import { Player } from "../components/Player";
import { Position } from "../components/Position";
import { Sprite } from "../components/Sprite";

export const exampleSystem = () => {
  const exampleEnterQuery = buildQuery({
    player: Player,
    sprite: Sprite,
    position: Position
  });

  return defineSystem((world) => {
    exampleEnterQuery(world, (entityProxy) => {
      console.log("player x", entityProxy.position.x);
      console.log("player y", entityProxy.position.y);
      console.log("player texture id", entityProxy.sprite.texture);
    });
    return world;
  });
};
