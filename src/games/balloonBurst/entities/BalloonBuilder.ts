import {
  EntityProxy,
  EntityProxyProps,
  getComponents
} from "../../gameEngines/bitECS/entityHelper";
import { pixiComponents } from "../../gameEngines/pixi/components/pixiComponents";
import { PixiGame } from "../../gameEngines/pixi/PixiGame";

const balloonComponents = getComponents(pixiComponents, [
  "sprite",
  "position",
  "size",
  "velocity",
  "rotation",
  "interaction"
]);

export type BalloonOptions = EntityProxyProps<typeof balloonComponents>;

const defaultBalloonProps = {
  sprite: {
    texture: "blackb.gif"
  },
  position: {
    x: 50,
    y: 250
  },
  size: {
    width: 50,
    height: 50
  },
  velocity: {
    y: -0.5,
    x: 0
  }
};

export function createBalloon(game: PixiGame, options: BalloonOptions = {}) {
  return game.createEntity(balloonComponents, options, defaultBalloonProps);
}
