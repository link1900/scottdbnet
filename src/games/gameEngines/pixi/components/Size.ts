import { defineComponent, Types } from "bitecs";
import { ComponentProxy } from "../../bitECS/ComponentProxy";

export const Size = defineComponent({ width: Types.f32, height: Types.f32 });

export class SizeProxy extends ComponentProxy<typeof Size> {
  constructor() {
    super("size", Size);
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
