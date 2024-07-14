import { ComponentType, ISchema, TypedArray } from "bitecs";
import { DataField, DataFieldType } from "./DataField";

export abstract class ComponentProxy<T extends ComponentType<ISchema>> {
  id: number;
  component: T;

  protected constructor(component: T) {
    this.id = 0;
    this.component = component;
  }

  getDataValue<T extends DataFieldType>(
    fieldData: DataField<T>,
    field: TypedArray
  ) {
    return fieldData.getValue(field[this.id]) ?? null;
  }

  setDataValue<T extends DataFieldType>(
    fieldData: DataField<T>,
    field: TypedArray,
    val: T | null
  ): void {
    const oldId = field[this.id];
    if (val !== null) {
      field[this.id] = fieldData.setValue(val);
    } else {
      field[this.id] = 0;
    }
    if (oldId !== 0) {
      fieldData.removeValue(oldId);
    }
  }
}
