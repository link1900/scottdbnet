import { ComponentType, defineComponent, Types } from "bitecs";
import { ComponentProxy } from "../../bitECS/ComponentProxy";
import { Container as PixiContainer } from "pixi.js";
import { DataField } from "../../bitECS/DataField";

export const ContainerSchema = {
  container: Types.ui32
};
export type ContainerSchemaType = ComponentType<typeof ContainerSchema>;

export class ContainerProxy extends ComponentProxy<ContainerSchemaType> {
  containerData = new DataField<PixiContainer>();

  constructor() {
    super(defineComponent(ContainerSchema));
  }

  get container(): PixiContainer | null {
    return this.getDataValue(this.containerData, this.component.container);
  }

  set container(val: PixiContainer | null) {
    this.setDataValue(this.containerData, this.component.container, val);
  }
}
