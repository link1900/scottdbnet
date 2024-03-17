import { Graphics } from "pixi.js";
import {
  EntityProxy,
  getComponents,
  QueryType
} from "../../bitECS/entityHelper";
import { SystemBase } from "../../bitECS/SystemBase";
import { pixiComponents } from "../components/pixiComponents";
import { ShapeType } from "../components/Shape";
import { PixiGame } from "../PixiGame";

const shapeStructure = getComponents(pixiComponents, [
  "shape",
  "position",
  "size"
]);

export type Shape = typeof shapeStructure;

function createGraphic(entity: EntityProxy<Shape>, game: PixiGame) {
  const graphic = new Graphics();
  entity.shape.graphic = graphic;
  renderGraphic(entity, game);
  game.pixiApp.stage.addChild(graphic);
}

function renderGraphic(entity: EntityProxy<Shape>, game: PixiGame) {
  const graphic = entity.shape.graphic;
  if (!graphic) {
    return;
  }
  switch (entity.shape.type) {
    case ShapeType.RECT:
      graphic.rect(
        entity.position.x,
        entity.position.y,
        entity.size.width,
        entity.size.height
      );
      break;
    case ShapeType.CIRCLE:
      graphic.circle(entity.position.x, entity.position.y, entity.size.width);
      break;
  }
  graphic.fill(entity.shape.fillColor ?? "#FFFFFF");
  graphic.stroke({
    width: entity.shape.lineSize,
    color: entity.shape.lineColor ?? "#000000"
  });
}

function deleteGraphic(entity: EntityProxy<Shape>, game: PixiGame) {
  const graphic = entity.shape.graphic;
  if (!graphic) {
    return;
  }
  game.pixiApp.stage.removeChild(graphic);
  graphic.destroy();
  entity.shape.graphic = null;
}

export class ShapeSystem extends SystemBase<Shape> {
  constructor(game: PixiGame) {
    super(game, shapeStructure);
    this.addQuery(createGraphic, QueryType.ENTER);
    // this.addQuery(renderGraphic, QueryType.STANDARD);
    this.addQuery(deleteGraphic, QueryType.EXIT);
  }
}
