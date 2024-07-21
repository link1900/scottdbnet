import { randomInteger } from "../../util/randomHelper";

export class ConwaySetArray {
  private currentState: Set<number>;
  private nextState: Set<number>;
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.currentState = new Set<number>();
    this.nextState = new Set<number>();
    this.initializeState();
  }

  initializeState() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const index = y * this.width + x;
        if (randomInteger(1, 10) <= 3) {
          this.currentState.add(index);
        }
      }
    }
    this.nextState = new Set<number>(this.currentState);
  }

  calculateNextState() {
    this.nextState.clear();
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const index = y * this.width + x;
        const alive = this.currentState.has(index);
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
              neighbors += this.currentState.has(
                neighborY * this.width + neighborX
              )
                ? 1
                : 0;
            }
          }
        }

        if (alive && neighbors >= 2 && neighbors <= 3) {
          this.nextState.add(index);
        } else if (!alive && neighbors === 3) {
          this.nextState.add(index);
        }
      }
    }

    this.currentState = new Set<number>(this.nextState);
  }

  getCurrentState() {
    return this.currentState;
  }
}
