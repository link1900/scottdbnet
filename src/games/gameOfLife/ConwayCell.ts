import { GridCell, GridCellProps } from '../gameEngine';

export interface ConwayCellProps extends GridCellProps {
  living: boolean;
}

export class ConwayCell extends GridCell {
  private living: boolean;

  constructor(props: ConwayCellProps) {
    super(props);
    const { living = false } = props;
    this.living = living;
    this.color = this.getCellColor();
  }

  public getCellColor() {
    return this.living ? 'blue' : 'white';
  }

  public setLiving(living: boolean) {
    this.living = living;
    this.color = this.getCellColor();
  }

  public getLiving() {
    return this.living;
  }

  public onClick() {
    this.setLiving(true);
    this.render();
  }

  public newState(): boolean {
    const neighbours = this.getCellNeighbours() as ConwayCell[];
    const liveNeighbours = neighbours.filter(i => i.getLiving()).length;
    if (this.living) {
      if (liveNeighbours < 2) {
        return false;
      } else if (liveNeighbours > 3) {
        return false;
      } else {
        return true;
      }
    } else {
      return liveNeighbours === 3;
    }
  }
}
