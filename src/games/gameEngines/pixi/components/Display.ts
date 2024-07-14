import { ComponentType, defineComponent, Types } from "bitecs";
import { ComponentProxy } from "../../bitECS/ComponentProxy";

export const DisplaySchema = { visible: Types.ui8 };
export type DisplaySchemaType = ComponentType<typeof DisplaySchema>;

export class DisplayProxy extends ComponentProxy<DisplaySchemaType> {
  constructor() {
    super(defineComponent(DisplaySchema));
  }

  get visible(): boolean {
    return this.component.visible[this.id] !== 0;
  }

  set visible(val: boolean) {
    this.component.visible[this.id] = val ? 1 : 0;
  }
}
