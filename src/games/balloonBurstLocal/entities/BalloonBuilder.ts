import {
  EntityProxyProps,
  getComponents
} from "../../gameEngines/bitECS/entityHelper";
import { spriteComponents } from "../../gameEngines/pixi/entities/SpriteEntity";
import { PixiGame } from "../../gameEngines/pixi/PixiGame";
import {
  BalloonBurstComponents,
  balloonBurstComponents
} from "../components/balloonBurstComponents";

export const balloonComponents: BalloonBurstComponents[] = [
  ...spriteComponents,
  "velocity",
  "interaction",
  "balloonTag"
];
export const balloonFields = getComponents(
  balloonBurstComponents,
  balloonComponents
);
export type BalloonOptions = EntityProxyProps<typeof balloonFields>;

const defaultBalloonProps = {
  sprite: {
    texture: "blueb.png"
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
  const defaultContainer: BalloonOptions = {
    ...defaultBalloonProps
  };
  return game.createEntity(balloonFields, options, defaultContainer);
}
