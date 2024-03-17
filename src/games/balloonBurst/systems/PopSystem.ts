import {
  EntityProxy,
  getComponents,
  QueryType
} from "../../gameEngines/bitECS/entityHelper";
import { SystemBase } from "../../gameEngines/bitECS/SystemBase";
import { pixiComponents } from "../../gameEngines/pixi/components/pixiComponents";
import { PixiGame } from "../../gameEngines/pixi/PixiGame";

const clickedStructure = getComponents(pixiComponents, ["clicked", "position"]);

export type Clicked = typeof clickedStructure;

function createClicked(entity: EntityProxy<Clicked>, game: PixiGame) {
  console.log("clicked", entity.id);
  game.removeComponent(entity, pixiComponents.clicked);
}

export class PopSystem extends SystemBase<Clicked> {
  constructor(game: PixiGame) {
    super(game, clickedStructure);
    this.addQuery(createClicked, QueryType.ENTER);
  }
}
