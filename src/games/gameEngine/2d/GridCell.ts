import { isPresent } from '../util/arrayHelper';
import { Rect, RectProps } from './Rect';
import { WorldGrid } from './WorldGrid';

export interface GridCellProps extends RectProps {
  gridX: number;
  gridY: number;
}

export class GridCell extends Rect {
  public gridX: number;
  public gridY: number;

  constructor(props: GridCellProps) {
    super(props);
    const { gridX = 0, gridY = 0 } = props;

    this.gridX = gridX;
    this.gridY = gridY;
  }

  public getCellNeighbours(): GridCell[] {
    if (this.world instanceof WorldGrid) {
      return [
        this.world.getCell(this.gridY + 1, this.gridX),
        this.world.getCell(this.gridY - 1, this.gridX),
        this.world.getCell(this.gridY, this.gridX + 1),
        this.world.getCell(this.gridY, this.gridX - 1),
        this.world.getCell(this.gridY + 1, this.gridX + 1),
        this.world.getCell(this.gridY - 1, this.gridX - 1),
        this.world.getCell(this.gridY + 1, this.gridX - 1),
        this.world.getCell(this.gridY - 1, this.gridX + 1)
      ].filter(isPresent);
    } else {
      return [];
    }
  }
}
