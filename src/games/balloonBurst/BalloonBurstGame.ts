import { createShape } from "../gameEngines/pixi/builders/shapeBuilder";
import { ShapeType } from "../gameEngines/pixi/components/Shape";
import { PixiGame } from "../gameEngines/pixi/PixiGame";
import { InteractionSystem } from "../gameEngines/pixi/systems/InteractionSystem";
import { ShapeSystem } from "../gameEngines/pixi/systems/ShapeSystem";
import { SpriteSystem } from "../gameEngines/pixi/systems/SpriteSystem";
import { createBalloon } from "./entities/BalloonBuilder";
import { PopSystem } from "./systems/PopSystem";

export async function setupBalloonBurst(game: PixiGame) {
  await game.loadSpriteSheet("/assets/balloon/balloon_pack.json");

  game.settings.physicsWireframe = true;
  game.matterEngine.gravity.scale = -0.00008;

  // setup systems
  game.addSystem(new SpriteSystem(game));
  game.addSystem(new ShapeSystem(game));
  game.addSystem(new InteractionSystem(game));
  game.addSystem(new PopSystem(game));

  // setup entities
  createBalloon(game, {
    position: {
      x: 50,
      y: 50
    },
    size: {
      width: 50,
      height: 50
    },
    physical: {
      restitution: 0.6,
      density: 0.01,
      frictionAir: 0.01
    },
    sprite: {
      texture: "blackb.gif"
    }
  });

  createShape(game, {
    shape: {
      type: ShapeType.RECT,
      fillColor: "#FF0000",
      lineSize: 3,
      lineColor: "#00FF00"
    },
    position: {
      x: 150,
      y: 150
    },
    size: {
      width: 50,
      height: 50
    }
  });
}
