import { createSceneEntity } from "../gameEngines/pixi/entities/SceneEntity";
import { PixiGame } from "../gameEngines/pixi/PixiGame";
import { BoundCullingSystem } from "../gameEngines/pixi/systems/BoundCullingSystem";
import { InteractionSystem } from "../gameEngines/pixi/systems/InteractionSystem";
import { MotionSystem } from "../gameEngines/pixi/systems/MotionSystem";
import { SceneSystem } from "../gameEngines/pixi/systems/SceneSystem";
import { SpriteSystem } from "../gameEngines/pixi/systems/SpriteSystem";
import { createBalloon } from "./entities/BalloonBuilder";
import { PopSystem } from "./systems/PopSystem";

export async function setupBalloonBurst(game: PixiGame) {
  console.log("loading assets");
  await game.readManifest({
    basePath: "/assets/balloon",
    manifest: "manifest.json"
  });
  await game.loadBundle("main");

  // setup systems
  console.log("setting up systems");
  game.addSystem(new BoundCullingSystem(game));
  game.addSystem(new SceneSystem(game));
  game.addSystem(new SpriteSystem(game));
  game.addSystem(new InteractionSystem(game));
  game.addSystem(new PopSystem(game));
  game.addSystem(new MotionSystem(game));

  // setup entities
  console.log("creating entities");

  const menuScene = createSceneEntity(game);
  // createBalloon(game, {
  //   parent: { ref: menuScene.id },
  //   sprite: { texture: "greenb.gif" }
  // });

  const gameScene = createSceneEntity(game, { display: { visible: false } });
  // createBalloon(game, { parent: { ref: gameScene.id } });
  createBalloon(game);
}

export async function runBalloonBurst(game: PixiGame) {}
