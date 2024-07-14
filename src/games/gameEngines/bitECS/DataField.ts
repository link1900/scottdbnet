import { ReusableIdGenerator } from "./ReusableIdGenerator";

export type DataFieldType = object | string;

export class DataField<T extends DataFieldType> {
  private readonly dataMap: Map<number, T>;
  private idGenerator: ReusableIdGenerator;

  constructor() {
    this.dataMap = new Map();
    this.idGenerator = new ReusableIdGenerator();
  }

  setValue(value: T): number {
    const id = this.idGenerator.generateId();
    this.dataMap.set(id, value);
    return id;
  }

  getValue(id: number) {
    return this.dataMap.get(id);
  }

  removeValue(id: number) {
    this.dataMap.delete(id);
    this.idGenerator.recycleId(id);
  }
}
