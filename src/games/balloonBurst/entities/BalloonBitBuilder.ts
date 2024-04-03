import {
  EntityProxyProps,
  getComponents
} from "../../gameEngines/bitECS/entityHelper";
import { pixiComponents } from "../../gameEngines/pixi/components/pixiComponents";
import {
  spriteComponents,
  SpriteEntity
} from "../../gameEngines/pixi/entities/SpriteEntity";
import { PixiGame } from "../../gameEngines/pixi/PixiGame";

const balloonBitComponents = getComponents(pixiComponents, [
  ...spriteComponents,
  "velocity",
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

export function createBalloonBits(game: PixiGame, balloon: SpriteEntity) {
  const options: BalloonBitOptions = {
    position: {
      x: balloon.position.x,
      y: balloon.position.y
    },
    parent: {
      ref: balloon.parent.ref
    }
  };

  return game.createEntity(
    balloonBitComponents,
    options,
    defaultBalloonBitProps
  );
}
