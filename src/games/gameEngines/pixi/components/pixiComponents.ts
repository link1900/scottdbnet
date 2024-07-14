import { DisplayProxy } from "./Display";
import { ClickedProxy } from "./Clicked";
import { ContainerProxy } from "./Container";
import { EntityRefProxy } from "./EntityRef";
import { InteractionProxy } from "./Interaction";
import { PhysicalProxy } from "./Physical";
import { PositionProxy } from "./Position";
import { RotationProxy } from "./Rotation";
import { ShapeProxy } from "./Shape";
import { SizeProxy } from "./Size";
import { SpriteProxy } from "./Sprite";

export const pixiComponents = {
  clicked: new ClickedProxy(),
  interaction: new InteractionProxy(),
  physical: new PhysicalProxy(),
  sprite: new SpriteProxy(),
  shape: new ShapeProxy(),
  position: new PositionProxy(),
  size: new SizeProxy(),
  velocity: new PositionProxy(),
  rotation: new RotationProxy(),
  parent: new EntityRefProxy(),
  container: new ContainerProxy(),
  display: new DisplayProxy()
};

export type PixiComponentsTypes = keyof typeof pixiComponents;
