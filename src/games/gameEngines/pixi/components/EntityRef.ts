import { ComponentType, defineComponent, Types } from "bitecs";
import { ComponentProxy } from "../../bitECS/ComponentProxy";

export const EntityRefSchema = { ref: Types.eid };
export type EntityRefSchemaType = ComponentType<typeof EntityRefSchema>;

export class EntityRefProxy extends ComponentProxy<EntityRefSchemaType> {
  constructor() {
    super(defineComponent(EntityRefSchema));
  }

  get ref(): number {
    return this.component.ref[this.id];
  }

  set ref(val: number) {
    this.component.ref[this.id] = val;
  }
}
