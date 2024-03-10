import { defineComponent, Types } from "bitecs";
import { ComponentProxy, EntityProxy } from "../../bitECS/proxyHelper";

export const Velocity = defineComponent({ x: Types.f32, y: Types.f32 });

export interface VelocityOptions {
  velocityX?: number;
  velocityY?: number;
}

export function velocityBuilder(
  velocityEntity: EntityProxy<{ velocity: ComponentProxy<typeof Velocity> }>,
  options: VelocityOptions
): EntityProxy<{ velocity: ComponentProxy<typeof Velocity> }> {
  velocityEntity.velocity.x = options.velocityX ?? 0;
  velocityEntity.velocity.y = options.velocityY ?? 0;
  return velocityEntity;
}
