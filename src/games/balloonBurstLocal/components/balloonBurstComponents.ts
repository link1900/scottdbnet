import { pixiComponents } from "../../gameEngines/pixi/components/pixiComponents";
import { BalloonTagProxy } from "./BalloonTag";

export const balloonBurstComponents = {
  ...pixiComponents,
  balloonTag: new BalloonTagProxy()
};

export type BalloonBurstComponents = keyof typeof balloonBurstComponents;
