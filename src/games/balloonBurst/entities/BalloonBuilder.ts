import {
  Physical,
  physicalBuilder,
  PhysicalOptions
} from "../../gameEngines/pixi/components/Physical";
import {
  Position,
  PositionOptions,
  positionBuilder
} from "../../gameEngines/pixi/components/Position";
import {
  Rotation,
  rotationBuilder,
  RotationOptions
} from "../../gameEngines/pixi/components/Rotation";
import {
  Size,
  sizeBuilder,
  SizeOptions
} from "../../gameEngines/pixi/components/Size";
import {
  Sprite,
  spriteBuilder,
  SpriteOptions
} from "../../gameEngines/pixi/components/Sprite";
import {
  Velocity,
  velocityBuilder,
  VelocityOptions
} from "../../gameEngines/pixi/components/Velocity";
import { PixiGame } from "../../gameEngines/pixi/PixiGame";

export interface BalloonOptions
  extends SpriteOptions,
    PositionOptions,
    RotationOptions,
    SizeOptions,
    VelocityOptions,
    PhysicalOptions {}

export function createBalloon(game: PixiGame, options: BalloonOptions) {
  const balloon = game.createEntity({
    sprite: Sprite,
    position: Position,
    size: Size,
    velocity: Velocity,
    rotation: Rotation,
    physical: Physical
  });

  spriteBuilder(game, balloon, options);
  positionBuilder(balloon, options);
  rotationBuilder(balloon, options);
  sizeBuilder(balloon, options);
  velocityBuilder(balloon, options);
  physicalBuilder(balloon, {
    restitution: 0.6,
    density: 0.01,
    frictionAir: 0.01,
    ...options
  });

  return balloon;
}
