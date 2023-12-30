import Shape, { ShapeProps } from "./Shape";

export interface RectProps extends ShapeProps {
  borderColor?: string;
  hasBorder?: boolean;
}

export class Rect extends Shape {
  public hasBorder: boolean;
  public borderColor: string;

  constructor(props: RectProps) {
    super(props);
    const { hasBorder = false, borderColor = "black" } = props;
    this.hasBorder = hasBorder;
    this.borderColor = borderColor;
  }

  public render() {
    const context = this.world.renderContext;
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);

    if (this.hasBorder) {
      context.strokeStyle = this.borderColor;
      context.strokeRect(this.x, this.y, this.width, this.height);
    }
  }
}
