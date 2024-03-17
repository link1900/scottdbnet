import {
  EntityProxy,
  getComponents,
  QueryType
} from "../../bitECS/entityHelper";
import { SystemBase } from "../../bitECS/SystemBase";
import { pixiComponents } from "../components/pixiComponents";
import { PixiGame } from "../PixiGame";

const interactionStructure = getComponents(pixiComponents, [
  "sprite",
  "position",
  "interaction"
]);

export type Interaction = typeof interactionStructure;

function createInteraction(entity: EntityProxy<Interaction>, game: PixiGame) {
  const sprite = entity.sprite.sprite;
  if (!sprite) {
    return;
  }
  sprite.eventMode = "dynamic";
  sprite.cursor = "pointer";
  sprite.on("pointerdown", (e) => {
    game.addComponent(entity, pixiComponents.clicked);
    e.preventDefault();
  });
}

function deleteInteraction(entity: EntityProxy<Interaction>, game: PixiGame) {
  const sprite = entity.sprite.sprite;
  if (!sprite) {
    return;
  }
  game.removeComponent(entity, pixiComponents.clicked);
  sprite.eventMode = "passive";
  sprite.cursor = "auto";
  sprite.off("pointerdown");
}

export class InteractionSystem extends SystemBase<Interaction> {
  constructor(game: PixiGame) {
    super(game, interactionStructure);

    // standard interaction setup
    game.pixiApp.stage.eventMode = "static";
    game.pixiApp.stage.hitArea = game.pixiApp.screen;

    // interaction queries
    this.addQuery(createInteraction, QueryType.ENTER);
    this.addQuery(deleteInteraction, QueryType.EXIT);
  }
}
