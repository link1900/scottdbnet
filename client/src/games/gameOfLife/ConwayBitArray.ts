import { randomInteger } from "../../util/randomHelper";

export class ConwayGameOfLifeBitArray {
  private currentState: Uint32Array;
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.currentState = new Uint32Array(Math.ceil((width * height) / 32));
    this.initializeState();
  }

  initializeState() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const index = Math.floor((y * this.width + x) / 32);
        const bit = (y * this.width + x) % 32;
        if (randomInteger(1, 10) <= 3) {
          this.currentState[index] &= ~(1 << bit);
        } else {
          this.currentState[index] |= 1 << bit;
        }
      }
    }
  }

  calculateNextState() {
    const nextState = new Uint32Array(this.currentState.length);

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const index = Math.floor((y * this.width + x) / 32);
        const bit = (y * this.width + x) % 32;
        const alive = (this.currentState[index] & (1 << bit)) !== 0;
        let neighbors = 0;

        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            const neighborX = x + dx;
            const neighborY = y + dy;
            if (
              neighborX >= 0 &&
              neighborX < this.width &&
              neighborY >= 0 &&
              neighborY < this.height
            ) {
              const neighborIndex = Math.floor(
                (neighborY * this.width + neighborX) / 32
              );
              const neighborBit = (neighborY * this.width + neighborX) % 32;
              neighbors +=
                (this.currentState[neighborIndex] & (1 << neighborBit)) !== 0
                  ? 1
                  : 0;
            }
          }
        }

        if (alive && (neighbors < 2 || neighbors > 3)) {
          nextState[index] &= ~(1 << bit);
        } else if (!alive && neighbors === 3) {
          nextState[index] |= 1 << bit;
        } else {
          nextState[index] = this.currentState[index];
        }
      }
    }

    this.currentState = nextState;
  }

  getCurrentState() {
    const unpackedState = new Uint8Array(this.width * this.height);
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const index = Math.floor((y * this.width + x) / 32);
        const bit = (y * this.width + x) % 32;
        unpackedState[y * this.width + x] =
          (this.currentState[index] & (1 << bit)) !== 0 ? 1 : 0;
      }
    }
    return unpackedState;
  }
}
