import {
  EntityProxy,
  getComponents,
  QueryType
} from "../../gameEngines/bitECS/entityHelper";
import { SystemBase } from "../../gameEngines/bitECS/SystemBase";
import { pixiComponents } from "../../gameEngines/pixi/components/pixiComponents";
import { PixiGame } from "../../gameEngines/pixi/PixiGame";
import { createBalloonBits } from "../entities/BalloonBitBuilder";

const clickedStructure = getComponents(pixiComponents, [
  "clicked",
  "sprite",
  "position",
  "size"
]);

export type Clicked = typeof clickedStructure;

function createClicked(entity: EntityProxy<Clicked>, game: PixiGame) {
  game.killEntity(entity.id);
  game.audio.play("pop.wav");
  createBalloonBits(game, entity);
}

export class PopSystem extends SystemBase<Clicked> {
  constructor(game: PixiGame) {
    super(game, clickedStructure);
    this.addQuery(createClicked, QueryType.ENTER);
  }
}
