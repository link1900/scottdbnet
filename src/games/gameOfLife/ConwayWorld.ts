import { GridCellProps, randomInteger } from "../gameEngines/sdbCanvas2";
import { WorldGrid, WorldGridProps } from "../gameEngines/sdbCanvas2";
import { ConwayCell } from "./ConwayCell";

export interface ConwayWorldProps extends WorldGridProps {}

export class ConwayWorld extends WorldGrid {
  public cellBuilder(defaultProps: GridCellProps): ConwayCell {
    return new ConwayCell({
      living: randomInteger(1, 10) === 1,
      ...defaultProps
    });
  }

  public simulate() {
    const updates: Array<{ x: number; y: number; state: boolean }> = [];
    const cells = this.cells as ConwayCell[][];
    for (let y = 0; y < this.gridSize; y += 1) {
      for (let x = 0; x < this.gridSize; x += 1) {
        const cell = cells[y][x];
        const newState = cell.newState();
        if (cell.getLiving() !== newState) {
          updates.push({ y, x, state: cells[y][x].newState() });
        }
      }
    }

    updates.forEach((update) => {
      cells[update.y][update.x].setLiving(update.state);
    });
  }
}
