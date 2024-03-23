import { PixiGame } from "../gameEngines/pixi/PixiGame";
import { BoundCullingSystem } from "../gameEngines/pixi/systems/BoundCullingSystem";
import { InteractionSystem } from "../gameEngines/pixi/systems/InteractionSystem";
import { MotionSystem } from "../gameEngines/pixi/systems/MotionSystem";
import { SpriteSystem } from "../gameEngines/pixi/systems/SpriteSystem";
import { createBalloon } from "./entities/BalloonBuilder";
import { PopSystem } from "./systems/PopSystem";

export async function setupBalloonBurst(game: PixiGame) {
  await game.loadSpriteSheet("/assets/balloon/balloon_pack.json");

  // setup systems
  game.addSystem(new BoundCullingSystem(game));
  game.addSystem(new SpriteSystem(game));
  game.addSystem(new InteractionSystem(game));
  game.addSystem(new PopSystem(game));
  game.addSystem(new MotionSystem(game));

  // setup entities
  createBalloon(game);
}
