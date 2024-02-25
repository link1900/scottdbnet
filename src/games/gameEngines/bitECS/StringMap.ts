export type StringEntry = {
  id: number;
  value: string;
};

export class StringMap {
  private readonly stringEntries: StringEntry[];
  private index: number;

  constructor() {
    this.stringEntries = [];
    this.index = 0;
  }

  addEntry(value: string) {
    const entry = {
      id: this.index,
      value
    };
    this.stringEntries.push(entry);
    this.index += 1;
    return entry;
  }

  addEntries(values: string[]) {
    values.forEach((v) => this.addEntry(v));
  }

  findValueById(id: number): string | undefined {
    return this.stringEntries.find((e) => e.id === id)?.value;
  }

  findIdByValue(value: string): number | undefined {
    return this.stringEntries.find((e) => e.value === value)?.id;
  }
}
