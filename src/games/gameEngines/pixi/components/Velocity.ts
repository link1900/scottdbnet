import { defineComponent, Types } from "bitecs";
import { ComponentProxy } from "../../bitECS/ComponentProxy";

export const Velocity = defineComponent({ x: Types.f32, y: Types.f32 });

export class VelocityProxy extends ComponentProxy<typeof Velocity> {
  constructor() {
    super("velocity", Velocity);
  }

  get x(): number {
    return this.component.x[this.id];
  }

  set x(val: number) {
    this.component.x[this.id] = val;
  }

  get y(): number {
    return this.component.x[this.id];
  }

  set y(val: number) {
    this.component.x[this.id] = val;
  }
}
