import { defineComponent, Types } from "bitecs";
import { ComponentProxy } from "../../bitECS/ComponentProxy";

export const Rotation = defineComponent({ angle: Types.f32 });

export class RotationProxy extends ComponentProxy<typeof Rotation> {
  constructor() {
    super("rotation", Rotation);
  }

  get angle(): number {
    return this.component.angle[this.id];
  }

  set angle(val: number) {
    this.component.angle[this.id] = val;
  }
}
