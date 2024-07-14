import {
  EntityProxy,
  getComponents,
  QueryType
} from "../../bitECS/entityHelper";
import { SystemBase } from "../../bitECS/SystemBase";
import { pixiComponents } from "../components/pixiComponents";
import { PixiGame } from "../PixiGame";

const motionStructure = getComponents(pixiComponents, [
  "position",
  "rotation",
  "velocity"
]);

type Motion = typeof motionStructure;

function motionRun(entity: EntityProxy<Motion>) {
  entity.position.x += entity.velocity.x;
  entity.position.y += entity.velocity.y;
}

export class MotionSystem extends SystemBase<Motion> {
  constructor(game: PixiGame) {
    super(game, motionStructure);
    this.addQuery(motionRun, QueryType.STANDARD);
  }
}
