import { Bodies, Composite, Vector } from "matter-js";
import {
  EntityProxy,
  getComponents,
  QueryType
} from "../../bitECS/entityHelper";
import { SystemBase } from "../../bitECS/SystemBase";
import { PhysicalMovementType } from "../components/Physical";
import { pixiComponents } from "../components/pixiComponents";
import { PixiGame } from "../PixiGame";

const matterStructure = getComponents(pixiComponents, [
  "physical",
  "position",
  "size",
  "velocity"
]);

export type Matter = typeof matterStructure;

function matterCreate(entity: EntityProxy<Matter>, game: PixiGame) {
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
  entity.physical.body = body;
}

function matterRender(entity: EntityProxy<Matter>, game: PixiGame) {
  const body = entity.physical.body;
  if (!body) {
    return;
  }

  body.force = Vector.create(entity.velocity.x, entity.velocity.y);
  entity.position.x = body.position.x;
  entity.position.y = body.position.y;

  // renderWireframe(game, matterGraphics, body);
}

function matterDelete(entity: EntityProxy<Matter>, game: PixiGame) {
  const body = entity.physical.body;
  if (!body) {
    return;
  }
  Composite.remove(game.matterEngine.world, body);
  entity.physical.body = null;
}

export class MatterSystem extends SystemBase<Matter> {
  constructor(game: PixiGame) {
    super(game, matterStructure);
    this.addQuery(matterCreate, QueryType.ENTER);
    this.addQuery(matterRender, QueryType.STANDARD);
    this.addQuery(matterDelete, QueryType.EXIT);
  }
}

// function renderWireframe(game: PixiGame, graphics: Graphics, body: Body) {
//   if (game.settings.physicsWireframe) {
//     const vertices = body.vertices;
//     graphics.lineStyle(1, "#00ff00", 1);
//
//     graphics.moveTo(vertices[0].x, vertices[0].y);
//     for (let i = 1; i < vertices.length; i++) {
//       graphics.lineTo(vertices[i].x, vertices[i].y);
//     }
//     graphics.lineTo(vertices[0].x, vertices[0].y);
//     graphics.closePath();
//   }
// }
