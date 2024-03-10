import { defineComponent, Types } from "bitecs";
import {
  ComponentOptions,
  ComponentProxy,
  EntityProxy
} from "../../bitECS/proxyHelper";

export enum PhysicalMovementType {
  STATIC,
  DYNAMIC
}

export const Physical = defineComponent({
  movement: Types.ui32,
  density: Types.f32,
  friction: Types.f32,
  frictionAir: Types.f32,
  restitution: Types.f32
});

export interface PhysicalOptions
  extends Omit<ComponentOptions<typeof Physical>, "movement"> {
  movement?: PhysicalMovementType;
}

export function physicalBuilder(
  physicalEntity: EntityProxy<{ physical: ComponentProxy<typeof Physical> }>,
  options: PhysicalOptions
): EntityProxy<{ physical: ComponentProxy<typeof Physical> }> {
  physicalEntity.physical.density = options.density ?? 0.001;
  physicalEntity.physical.friction = options.friction ?? 0.1;
  physicalEntity.physical.frictionAir = options.frictionAir ?? 0.01;
  physicalEntity.physical.restitution = options.restitution ?? 0;
  physicalEntity.physical.movement =
    options.movement ?? PhysicalMovementType.DYNAMIC;
  return physicalEntity;
}
