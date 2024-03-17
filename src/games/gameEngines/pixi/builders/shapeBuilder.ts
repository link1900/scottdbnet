import { EntityProxyProps, getComponents } from "../../bitECS/entityHelper";
import { pixiComponents } from "../components/pixiComponents";
import { PixiGame } from "../PixiGame";

const shapeStructure = getComponents(pixiComponents, [
  "shape",
  "position",
  "size"
]);

export type ShapeOptions = EntityProxyProps<typeof shapeStructure>;

export function createShape(game: PixiGame, options: ShapeOptions) {
  return game.createEntity(shapeStructure, options);
}
