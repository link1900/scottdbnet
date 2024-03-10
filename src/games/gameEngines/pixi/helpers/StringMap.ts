export type StringEntry = {
  id: number;
  value: string;
};

export class StringMap {
  private readonly idMap: Map<number, StringEntry>;
  private readonly valueMap: Map<string, StringEntry>;
  private index: number;

  constructor() {
    this.idMap = new Map();
    this.valueMap = new Map();
    this.index = 0;
  }

  addValue(value: string): number {
    return this.addEntry(value).id;
  }

  getValue(id: number): string | undefined {
    return this.findValueById(id);
  }

  addEntry(value: string): StringEntry {
    const found = this.valueMap.get(value);
    if (found) {
      return found;
    }

    const id = this.index;
    const entry = {
      id,
      value
    };
    this.idMap.set(id, entry);
    this.valueMap.set(value, entry);
    this.index += 1;
    return entry;
  }

  removeEntry(value: string) {
    const entry = this.valueMap.get(value);
    if (entry) {
      this.valueMap.delete(value);
      this.idMap.delete(entry.id);
    }
  }

  addEntries(values: string[]): StringEntry[] {
    return values.map((v) => this.addEntry(v));
  }

  findValueById(id: number): string | undefined {
    return this.idMap.get(id)?.value;
  }

  findIdByValue(value: string): number | undefined {
    return this.valueMap.get(value)?.id;
  }
}
