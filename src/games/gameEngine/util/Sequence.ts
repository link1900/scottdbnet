export class Sequence {
  current: number;
  increment: number;
  stringPrefix?: string;

  constructor(
    options: {
      startAt?: number;
      incrementBy?: number;
      stringPrefix?: string;
    } = {}
  ) {
    const { startAt = 0, incrementBy = 1, stringPrefix } = options;
    this.current = startAt;
    this.increment = incrementBy;
    this.stringPrefix = stringPrefix;
  }

  getNextNumber() {
    this.current = this.current + this.increment;
    return this.current;
  }

  getNextNumberString() {
    if (this.stringPrefix !== undefined) {
      return `${this.stringPrefix}${this.getNextNumber()}`;
    } else {
      return `${this.getNextNumber()}`;
    }
  }
}
