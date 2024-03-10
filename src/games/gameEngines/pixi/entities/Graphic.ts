import {
  Position,
  positionBuilder,
  PositionOptions
} from "../components/Position";
import {
  Rotation,
  rotationBuilder,
  RotationOptions
} from "../components/Rotation";
import { Shape, shapeBuilder, ShapeOptions } from "../components/Shape";
import { Size, sizeBuilder, SizeOptions } from "../components/Size";
import { PixiGame } from "../PixiGame";

export interface GraphicOptions
  extends ShapeOptions,
    PositionOptions,
    SizeOptions,
    RotationOptions {}

export function createGraphic(game: PixiGame, options: GraphicOptions) {
  const graphic = game.createEntity({
    shape: Shape,
    position: Position,
    size: Size,
    rotation: Rotation
  });

  shapeBuilder(game, graphic, options);
  positionBuilder(graphic, options);
  sizeBuilder(graphic, options);
  rotationBuilder(graphic, options);
  return graphic;
}
