import { ComponentType, defineComponent, Types } from "bitecs";
import { ComponentProxy } from "../../bitECS/ComponentProxy";

export const SizeSchema = { width: Types.f32, height: Types.f32 };
export type SizeSchemaType = ComponentType<typeof SizeSchema>;

export class SizeProxy extends ComponentProxy<SizeSchemaType> {
  constructor() {
    super(defineComponent(SizeSchema));
  }

  get width(): number {
    return this.component.width[this.id];
  }

  set width(val: number) {
    this.component.width[this.id] = val;
  }

  get height(): number {
    return this.component.height[this.id];
  }

  set height(val: number) {
    this.component.height[this.id] = val;
  }
}
