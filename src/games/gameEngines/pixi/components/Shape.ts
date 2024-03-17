import { defineComponent, Types } from "bitecs";
import { Graphics } from "pixi.js";
import { ComponentProxy } from "../../bitECS/ComponentProxy";
import { DataField } from "../../bitECS/DataField";

export enum ShapeType {
  CIRCLE,
  RECT
}

export const Shape = defineComponent({
  graphic: Types.ui32,
  type: Types.ui8,
  fillColor: Types.ui32,
  lineColor: Types.ui32,
  lineSize: Types.ui16
});

export class ShapeProxy extends ComponentProxy<typeof Shape> {
  graphicData = new DataField<Graphics>();
  fillColorData = new DataField<string>();
  lineColorData = new DataField<string>();

  constructor() {
    super("shape", Shape);
  }

  get graphic(): Graphics | null {
    return this.getDataValue(this.graphicData, this.component.graphic);
  }

  set graphic(val: Graphics | null) {
    this.setDataValue(this.graphicData, this.component.graphic, val);
  }

  get type(): ShapeType {
    return this.component.type[this.id];
  }

  set type(val: ShapeType) {
    this.component.type[this.id] = val;
  }

  get fillColor(): string | null {
    return this.getDataValue(this.fillColorData, this.component.fillColor);
  }

  set fillColor(val: string | null) {
    this.setDataValue(this.fillColorData, this.component.fillColor, val);
  }

  get lineColor(): string | null {
    return this.getDataValue(this.lineColorData, this.component.lineColor);
  }

  set lineColor(val: string | null) {
    this.setDataValue(this.lineColorData, this.component.lineColor, val);
  }

  get lineSize(): number {
    return this.component.lineSize[this.id];
  }

  set lineSize(val: number) {
    this.component.lineSize[this.id] = val;
  }
}
