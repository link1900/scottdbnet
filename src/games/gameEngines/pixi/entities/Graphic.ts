import { EntityProxyProps, getComponents } from "../../bitECS/entityHelper";
import { pixiComponents } from "../components/pixiComponents";
import { PixiGame } from "../PixiGame";

const graphicComponents = getComponents(pixiComponents, [
  "shape",
  "position",
  "size",
  "rotation"
]);

export type GraphicOptions = EntityProxyProps<typeof graphicComponents>;

export function createGraphic(game: PixiGame, options: GraphicOptions) {
  return game.createEntity(graphicComponents, options);
}
