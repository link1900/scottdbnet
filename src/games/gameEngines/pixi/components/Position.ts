import { ComponentType, defineComponent, Types } from "bitecs";
import { ComponentProxy } from "../../bitECS/ComponentProxy";

export const PositionSchema = { x: Types.f32, y: Types.f32 };
export type PositionSchemaType = ComponentType<typeof PositionSchema>;

export class PositionProxy extends ComponentProxy<PositionSchemaType> {
  constructor() {
    super(defineComponent(PositionSchema));
  }

  get x(): number {
    return this.component.x[this.id];
  }

  set x(val: number) {
    this.component.x[this.id] = val;
  }

  get y(): number {
    return this.component.y[this.id];
  }

  set y(val: number) {
    this.component.y[this.id] = val;
  }
}
