import { PixiGame } from "../gameEngines/pixi/PixiGame";
import { createMatterSystem } from "../gameEngines/pixi/systems/MatterSystem";
import { createShapeSystem } from "../gameEngines/pixi/systems/ShapeSystem";
import { createSpriteSystem } from "../gameEngines/pixi/systems/SpriteSystem";
import { createBalloon } from "./entities/BalloonBuilder";

export async function setupBalloonBurst(game: PixiGame) {
  await game.loadSpriteSheet("/assets/balloon/balloon_pack.json");

  game.settings.physicsWireframe = true;
  game.matterEngine.gravity.scale = 0; // -0.00008;

  // setup entities
  createBalloon(game, {
    x: 50,
    y: 450,
    width: 50,
    height: 50,
    // velocityY: -0.003,
    texture: "blackb.gif"
  });

  // setup systems
  game.systems.push(createMatterSystem(game));
  game.systems.push(createShapeSystem(game));
  game.systems.push(createSpriteSystem(game));
}
