import { GridCell, GridCellProps } from './GridCell';
import { World2D, World2DProps } from './World2D';

export interface WorldGridProps extends World2DProps {
  gridSize?: number;
  cellBorder?: boolean;
}

export class WorldGrid extends World2D {
  public gridSize: number;
  public cells: GridCell[][] = [];
  public cellBorder: boolean;

  constructor(props: WorldGridProps) {
    super(props);
    const { cellBorder = true, gridSize = 10 } = props;
    this.gridSize = gridSize;
    this.cellBorder = cellBorder;
    this.buildCellGrid();
  }

  public cellBuilder(defaultProps: GridCellProps): GridCell {
    return new GridCell(defaultProps);
  }

  public buildCellGrid(cellBuilder: (defaultProps: GridCellProps) => GridCell = this.cellBuilder) {
    const heightSize = this.height / this.gridSize;
    const widthSize = this.width / this.gridSize;
    for (let y = 0; y < this.gridSize; y += 1) {
      this.cells[y] = [];
      for (let x = 0; x < this.gridSize; x += 1) {
        const cell = cellBuilder({
          world: this,
          gridY: y,
          gridX: x,
          x: x * widthSize,
          y: y * heightSize,
          width: widthSize,
          height: heightSize,
          hasBorder: this.cellBorder,
          color: 'white'
        });
        this.cells[y][x] = cell;
        this.addEntity(cell);
      }
    }
  }

  public reset() {
    this.stop();
    this.buildCellGrid();
    this.start();
  }

  public getCell(y: number, x: number): GridCell | undefined {
    const gridY = y;
    const gridX = x;
    if (this.isValidCellLocation(gridY, gridX)) {
      return this.cells[gridY][gridX];
    } else {
      return undefined;
    }
  }

  public isValidCellLocation(gridY: number, gridX: number): boolean {
    return gridX >= 0 && gridX <= this.gridSize - 1 && gridY >= 0 && gridY <= this.gridSize - 1;
  }
}
