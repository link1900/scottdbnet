import { defineComponent, Types } from "bitecs";
import {
  ComponentOptions,
  ComponentProxy,
  EntityProxy
} from "../../bitECS/proxyHelper";

export const Position = defineComponent({ x: Types.f32, y: Types.f32 });

export interface PositionOptions extends ComponentOptions<typeof Position> {}

export function positionBuilder(
  positionEntity: EntityProxy<{ position: ComponentProxy<typeof Position> }>,
  options: PositionOptions
): EntityProxy<{ position: ComponentProxy<typeof Position> }> {
  positionEntity.position.x = options.x ?? 0;
  positionEntity.position.y = options.y ?? 0;
  return positionEntity;
}
