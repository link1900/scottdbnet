import { ComponentType, ISchema, TypedArray } from "bitecs";
import { DataField, DataFieldType } from "./DataField";

export abstract class ComponentProxy<T extends ComponentType<ISchema>> {
  id: number;
  componentName: string;
  component: T;

  protected constructor(componentName: string, component: T) {
    this.id = 0;
    this.componentName = componentName;
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
    fieldData.removeValue(field[this.id]);
    if (val !== null) {
      field[this.id] = fieldData.setValue(val);
    }
  }
}
