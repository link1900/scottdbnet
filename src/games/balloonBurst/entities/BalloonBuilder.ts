import {
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
  "physical",
  "interaction"
]);

export type BalloonOptions = EntityProxyProps<typeof balloonComponents>;

export function createBalloon(game: PixiGame, options: BalloonOptions) {
  return game.createEntity(balloonComponents, options);
}
