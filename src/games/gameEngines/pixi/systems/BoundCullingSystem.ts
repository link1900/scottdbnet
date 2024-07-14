import {
  EntityProxy,
  getComponents,
  QueryType
} from "../../bitECS/entityHelper";
import { SystemBase } from "../../bitECS/SystemBase";
import { pixiComponents } from "../components/pixiComponents";
import { PixiGame } from "../PixiGame";

const boundCullingStructure = getComponents(pixiComponents, [
  "position",
  "size"
]);

type BoundCulling = typeof boundCullingStructure;

function boundCullingRun(entity: EntityProxy<BoundCulling>, game: PixiGame) {
  if (
    entity.position.x < game.pixiApp.screen.width * -1 ||
    entity.position.y < game.pixiApp.screen.height * -1 ||
    entity.position.x > game.pixiApp.screen.width * 2 ||
    entity.position.y > game.pixiApp.screen.height * 2
  ) {
    game.killEntity(entity.id);
  }
}

export class BoundCullingSystem extends SystemBase<BoundCulling> {
  constructor(game: PixiGame) {
    super(game, boundCullingStructure);
    this.addQuery(boundCullingRun, QueryType.STANDARD);
  }
}
