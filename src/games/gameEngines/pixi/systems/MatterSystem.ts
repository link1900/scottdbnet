import { IWorld } from "bitecs";
import { Bodies, Body, Composite, Vector } from "matter-js";
import { Graphics } from "pixi.js";
import { EntityProxy } from "../../bitECS/proxyHelper";
import { buildQuery, QueryType } from "../../bitECS/queryHelper";
import { Physical, PhysicalMovementType } from "../components/Physical";
import { Position } from "../components/Position";
import { Size } from "../components/Size";
import { Velocity } from "../components/Velocity";
import { PixiGame } from "../PixiGame";

const matterStructure = {
  physical: Physical,
  position: Position,
  size: Size,
  velocity: Velocity
};

type MatterEntity = EntityProxy<typeof matterStructure>;

export function createMatterSystem(game: PixiGame) {
  const bodies = new Map<number, Body>();
  const matterGraphics = new Graphics();
  game.pixiApp.stage.addChild(matterGraphics);
  const matterQueryEnter = buildQuery(matterStructure, QueryType.ENTER);
  const matterQuerySimulate = buildQuery(matterStructure, QueryType.STANDARD);
  const matterQueryExit = buildQuery(matterStructure, QueryType.EXIT);

  return (world: IWorld) => {
    matterGraphics.clear();
    matterQueryEnter(world, (entity) => {
      const body = Bodies.rectangle(
        entity.position.x,
        entity.position.y,
        entity.size.width,
        entity.size.height,
        {
          density: entity.physical.density,
          friction: entity.physical.friction,
          frictionAir: entity.physical.frictionAir,
          restitution: entity.physical.restitution,
          isStatic: entity.physical.movement === PhysicalMovementType.STATIC,
          velocity: Vector.create(entity.velocity.x, entity.velocity.y)
        }
      );
      Composite.add(game.matterEngine.world, body);
      bodies.set(entity.id, body);
    });

    matterQuerySimulate(world, (entity) => {
      const body = bodies.get(entity.id);
      if (!body) {
        return;
      }

      body.force = Vector.create(entity.velocity.x, entity.velocity.y);
      entity.position.x = body.position.x;
      entity.position.y = body.position.y;

      renderWireframe(game, matterGraphics, body);
      clearOutOfBoundBodies(game, entity);
    });

    matterQueryExit(world, (entity) => {
      const body = bodies.get(entity.id);
      if (body) {
        Composite.remove(game.matterEngine.world, body);
        bodies.delete(entity.id);
      }
    });

    return world;
  };
}

function renderWireframe(game: PixiGame, graphics: Graphics, body: Body) {
  if (game.settings.physicsWireframe) {
    const vertices = body.vertices;
    graphics.lineStyle(1, "#00ff00", 1);

    graphics.moveTo(vertices[0].x, vertices[0].y);
    for (let i = 1; i < vertices.length; i++) {
      graphics.lineTo(vertices[i].x, vertices[i].y);
    }
    graphics.lineTo(vertices[0].x, vertices[0].y);
    graphics.closePath();
  }
}

function clearOutOfBoundBodies(game: PixiGame, entity: MatterEntity) {
  if (
    entity.position.x < game.pixiApp.screen.width * -1 ||
    entity.position.y < game.pixiApp.screen.height * -1 ||
    entity.position.x > game.pixiApp.screen.width * 2 ||
    entity.position.y > game.pixiApp.screen.height * 2
  ) {
    game.killEntity(entity.id);
  }
}
