import {
  EntityProxy,
  EntityProxyProps,
  getComponents
} from "../../gameEngines/bitECS/entityHelper";
import { pixiComponents } from "../../gameEngines/pixi/components/pixiComponents";
import { PositionProxy } from "../../gameEngines/pixi/components/Position";
import { PixiGame } from "../../gameEngines/pixi/PixiGame";

const balloonBitComponents = getComponents(pixiComponents, [
  "sprite",
  "position",
  "size",
  "velocity",
  "rotation",
  "physical"
]);

export type BalloonBitOptions = EntityProxyProps<typeof balloonBitComponents>;

const defaultBalloonBitProps: BalloonBitOptions = {
  sprite: {
    texture: "bluebits.gif"
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
    y: 2,
    x: 0
  }
};

export function createBalloonBits(
  game: PixiGame,
  balloon: EntityProxy<{ position: PositionProxy }>
) {
  const options: BalloonBitOptions = {
    position: {
      x: balloon.position.x,
      y: balloon.position.y
    }
  };

  return game.createEntity(
    balloonBitComponents,
    options,
    defaultBalloonBitProps
  );
}
