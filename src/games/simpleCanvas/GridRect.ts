import CanvasRect from "../simpleCanvas/CanvasRect";
import { CanvasRectProps } from "./CanvasRect";

export interface GridRectProps extends CanvasRectProps {
  gridx: number;
  gridy: number;
}

export default class GridRect extends CanvasRect {
  public gridx: number;
  public gridy: number;

  constructor({ gridx, gridy, ...rest }: GridRectProps) {
    super({ ...rest });
    this.gridx = gridx;
    this.gridy = gridy;
  }
}
