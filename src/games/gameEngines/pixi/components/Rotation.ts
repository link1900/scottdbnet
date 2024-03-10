import { defineComponent, Types } from "bitecs";
import {
  ComponentOptions,
  ComponentProxy,
  EntityProxy
} from "../../bitECS/proxyHelper";

export const Rotation = defineComponent({ angle: Types.f32 });

export interface RotationOptions extends ComponentOptions<typeof Rotation> {}

export function rotationBuilder(
  rotationEntity: EntityProxy<{ rotation: ComponentProxy<typeof Rotation> }>,
  options: RotationOptions
): EntityProxy<{ rotation: ComponentProxy<typeof Rotation> }> {
  rotationEntity.rotation.angle = options.angle ?? 0;
  return rotationEntity;
}
