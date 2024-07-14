import { EntityProxy, getComponents } from "../../bitECS/entityHelper";
import {
  pixiComponents,
  PixiComponentsTypes
} from "../components/pixiComponents";

export const spriteComponents: PixiComponentsTypes[] = [
  "sprite",
  "position",
  "size",
  "rotation",
  "parent"
];

export const spriteFields = getComponents(pixiComponents, spriteComponents);
export type SpriteFields = typeof spriteFields;
export type SpriteEntity = EntityProxy<SpriteFields>;
