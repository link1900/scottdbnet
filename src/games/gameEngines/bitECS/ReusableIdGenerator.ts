export class ReusableIdGenerator {
  private nextId: number;
  private recycledIds: number[];

  constructor() {
    this.nextId = 1;
    this.recycledIds = [];
  }

  generateId(): number {
    if (this.recycledIds.length > 0) {
      // Reuse recycled ID
      return this.recycledIds.pop()!;
    } else {
      // Generate a new ID
      return this.nextId++;
    }
  }

  recycleId(id: number): void {
    // Recycle the used ID
    if (id !== 0) {
      this.recycledIds.push(id);
    }
  }
}
