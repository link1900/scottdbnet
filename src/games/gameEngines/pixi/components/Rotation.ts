import { ComponentType, defineComponent, Types } from "bitecs";
import { ComponentProxy } from "../../bitECS/ComponentProxy";

export const RotationSchema = { angle: Types.f32 };
export type RotationSchemaType = ComponentType<typeof RotationSchema>;

export class RotationProxy extends ComponentProxy<RotationSchemaType> {
  constructor() {
    super(defineComponent(RotationSchema));
  }

  get angle(): number {
    return this.component.angle[this.id];
  }

  set angle(val: number) {
    this.component.angle[this.id] = val;
  }
}
