import { ComponentType, defineComponent, Types } from "bitecs";
import { Body } from "matter-js";
import { ComponentProxy } from "../../bitECS/ComponentProxy";
import { DataField } from "../../bitECS/DataField";

export enum PhysicalMovementType {
  STATIC,
  DYNAMIC
}

export const PhysicalSchema = {
  body: Types.ui32,
  movement: Types.ui32,
  density: Types.f32,
  friction: Types.f32,
  frictionAir: Types.f32,
  restitution: Types.f32
};
export type PhysicalSchemaType = ComponentType<typeof PhysicalSchema>;

export class PhysicalProxy extends ComponentProxy<PhysicalSchemaType> {
  bodyData = new DataField<Body>();

  constructor() {
    super(defineComponent(PhysicalSchema));
  }

  get body(): Body | null {
    return this.getDataValue(this.bodyData, this.component.body);
  }

  set body(val: Body | null) {
    this.setDataValue(this.bodyData, this.component.body, val);
  }

  get density(): number {
    return this.component.density[this.id];
  }

  set density(val: number) {
    this.component.density[this.id] = val;
  }

  get friction(): number {
    return this.component.friction[this.id];
  }

  set friction(val: number) {
    this.component.friction[this.id] = val;
  }

  get frictionAir(): number {
    return this.component.frictionAir[this.id];
  }

  set frictionAir(val: number) {
    this.component.frictionAir[this.id] = val;
  }

  get restitution(): number {
    return this.component.restitution[this.id];
  }

  set restitution(val: number) {
    this.component.restitution[this.id] = val;
  }

  get movement(): number {
    return this.component.movement[this.id];
  }

  set movement(val: number) {
    this.component.movement[this.id] = val;
  }
}
