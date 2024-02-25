import { PixiGame } from "../gameEngines/pixi/PixiGame";
import { createSpriteSystem } from "../gameEngines/pixi/systems/SpriteSystem";
import { createBalloon } from "./entities/BalloonBuilder";

export async function runBalloonBurst(game: PixiGame) {
  await game.loadSpriteSheet("/assets/balloon/balloon_pack.json");
  // setup entities
  createBalloon(game, { x: 50, y: 50, texture: "blackb.gif" });

  // setup systems
  game.systems.push(createSpriteSystem(game));

  // start it!
  game.start();
}
