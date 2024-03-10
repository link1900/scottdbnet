import { defineComponent, Types } from "bitecs";
import {
  ComponentOptions,
  ComponentProxy,
  EntityProxy
} from "../../bitECS/proxyHelper";
import { PixiGame } from "../PixiGame";

export enum ShapeType {
  CIRCLE,
  RECT
}

export const Shape = defineComponent({
  type: Types.ui8,
  fillColor: Types.ui32,
  lineColor: Types.ui32,
  lineSize: Types.ui16
});

export interface ShapeOptions
  extends Omit<ComponentOptions<typeof Shape>, "fillColor" | "lineColor"> {
  fillColor?: string;
  lineColor?: string;
}

export function shapeBuilder(
  game: PixiGame,
  shapeEntity: EntityProxy<{ shape: ComponentProxy<typeof Shape> }>,
  options: ShapeOptions
): EntityProxy<{ shape: ComponentProxy<typeof Shape> }> {
  shapeEntity.shape.type = options.type ?? ShapeType.RECT;
  shapeEntity.shape.fillColor = game.getColorValue(options.fillColor);
  shapeEntity.shape.lineColor = game.getColorValue(options.lineColor);
  shapeEntity.shape.lineSize = options.lineSize ?? 1;
  return shapeEntity;
}
