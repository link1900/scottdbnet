import { randomInteger } from "../../util/randomHelper";

export class ConwayArray {
  private currentState: Uint8Array;
  private neighbors: Uint8Array;
  private nextState: Uint8Array;
  private index: Uint8Array;
  private width: number;
  private height: number;
  private max: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.max = width * height;
    this.index = new Uint8Array(this.max);
    this.currentState = new Uint8Array(this.max);
    this.neighbors = new Uint8Array(this.max * 8);
    this.nextState = new Uint8Array(this.max);
    this.initializeState();
  }

  initializeState() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const index = y * this.width + x;
        this.currentState[index] = randomInteger(1, 10) <= 3 ? 1 : 0;
        this.index[index] = index;
        let nCount = 0;
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
              this.neighbors[index + nCount] =
                neighborY * this.width + neighborX;
              nCount++;
            }
          }
        }
      }
    }
    this.nextState.set(this.currentState);
  }

  calculateNextState() {
    for (let index = 0; index < this.max; index++) {
      const alive = this.currentState[index] === 1;
      let neighbors = 0;

      for (let i = 0; i < 8; i++) {
        if (this.currentState[this.neighbors[index + i]] === 1) {
          neighbors++;
          if (neighbors > 3) {
            break;
          }
        }
      }

      if (alive && (neighbors < 2 || neighbors > 3)) {
        this.nextState[index] = 0;
      } else if (!alive && neighbors === 3) {
        this.nextState[index] = 1;
      }
    }

    this.currentState.set(this.nextState);
  }

  getCurrentState() {
    return this.currentState;
  }
}
