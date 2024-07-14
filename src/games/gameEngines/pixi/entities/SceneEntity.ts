import {
  EntityProxy,
  EntityProxyProps,
  getComponents
} from "../../bitECS/entityHelper";
import {
  pixiComponents,
  PixiComponentsTypes
} from "../components/pixiComponents";
import { PixiGame } from "../PixiGame";

export const sceneComponents: PixiComponentsTypes[] = [
  "position",
  "size",
  "parent",
  "container",
  "display"
];

export const sceneFields = getComponents(pixiComponents, sceneComponents);
export type SceneFields = typeof sceneFields;
export type SceneEntity = EntityProxy<SceneFields>;
export type SceneOptions = EntityProxyProps<SceneFields>;

const sceneDefaultProps: SceneOptions = {
  position: {
    x: 0,
    y: 0
  },
  size: {
    width: 800,
    height: 600
  },
  display: {
    visible: true
  }
};

export function createSceneEntity(game: PixiGame, options?: SceneOptions) {
  const defaultOptions: SceneOptions = {
    ...sceneDefaultProps,
    size: { width: game.pixiApp.stage.width, height: game.pixiApp.stage.height }
  };

  return game.createEntity(sceneFields, options, defaultOptions);
}
