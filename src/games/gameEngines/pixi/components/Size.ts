import { defineComponent, Types } from "bitecs";
import {
  ComponentOptions,
  ComponentProxy,
  EntityProxy
} from "../../bitECS/proxyHelper";

export const Size = defineComponent({ width: Types.f32, height: Types.f32 });

export interface SizeOptions extends ComponentOptions<typeof Size> {}

export function sizeBuilder(
  sizeEntity: EntityProxy<{ size: ComponentProxy<typeof Size> }>,
  options: SizeOptions
): EntityProxy<{ size: ComponentProxy<typeof Size> }> {
  sizeEntity.size.width = options.width ?? 50;
  sizeEntity.size.height = options.height ?? 50;
  return sizeEntity;
}
