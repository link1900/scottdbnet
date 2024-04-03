import {
  EntityProxy,
  getComponents,
  QueryType
} from "../../gameEngines/bitECS/entityHelper";
import { SystemBase } from "../../gameEngines/bitECS/SystemBase";
import { spriteComponents } from "../../gameEngines/pixi/entities/SpriteEntity";
import { PixiGame } from "../../gameEngines/pixi/PixiGame";
import { balloonBurstComponents } from "../components/balloonBurstComponents";
import { createBalloonBits } from "../entities/BalloonBitBuilder";

const clickedStructure = getComponents(balloonBurstComponents, [
  ...spriteComponents,
  "balloonTag",
  "clicked"
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
