import { IWorld } from "bitecs";
import { Graphics } from "pixi.js";
import { EntityProxy } from "../../bitECS/proxyHelper";
import { buildQuery, QueryType } from "../../bitECS/queryHelper";
import { Position } from "../components/Position";
import { Shape, ShapeType } from "../components/Shape";
import { Size } from "../components/Size";
import { PixiGame } from "../PixiGame";

const shapeStructure = {
  shape: Shape,
  position: Position,
  size: Size
};

function renderShape(
  game: PixiGame,
  shape: Graphics,
  entity: EntityProxy<typeof shapeStructure>
) {
  shape.lineStyle(
    entity.shape.lineSize,
    game.getColorString(entity.shape.lineColor)
  );
  shape.beginFill(game.getColorString(entity.shape.fillColor));
  switch (entity.shape.type) {
    case ShapeType.RECT:
      shape.drawRect(
        entity.position.x,
        entity.position.y,
        entity.size.width,
        entity.size.height
      );
      break;
    case ShapeType.CIRCLE:
      shape.drawCircle(entity.position.x, entity.position.y, entity.size.width);
      break;
  }
  shape.endFill();
}

export function createShapeSystem(game: PixiGame) {
  const shapes = new Map<number, Graphics>();
  const shapeQueryEnter = buildQuery(shapeStructure, QueryType.ENTER);
  const shapeQuerySimulate = buildQuery(shapeStructure, QueryType.STANDARD);
  const shapeQueryExit = buildQuery(shapeStructure, QueryType.EXIT);

  return (world: IWorld) => {
    shapeQueryEnter(world, (entity) => {
      const shape = new Graphics();
      renderShape(game, shape, entity);
      game.pixiApp.stage.addChild(shape);
      shapes.set(entity.id, shape);
    });

    shapeQuerySimulate(world, (entity) => {
      const shape = shapes.get(entity.id);
      if (shape) {
        renderShape(game, shape, entity);
      }
    });

    shapeQueryExit(world, (entity) => {
      const shape = shapes.get(entity.id);
      if (shape) {
        game.pixiApp.stage.removeChild(shape);
        shape.destroy();
        shapes.delete(entity.id);
      }
    });

    return world;
  };
}
