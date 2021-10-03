import { CanvasShapeProps } from "./CanvasShape";
import CanvasShape from "./CanvasShape";

export interface CanvasTextProps extends CanvasShapeProps {
  text?: string;
  font?: string;
  fontSize?: number;
}

export default class CanvasText extends CanvasShape {
  public text: string;
  public font: string;
  public fontSize: number;

  constructor({
    text = "",
    font = "serif",
    fontSize = 12,
    ...rest
  }: CanvasTextProps) {
    super({ ...rest });
    this.text = text;
    this.font = font;
    this.fontSize = fontSize;
  }

  public draw(canvas: HTMLCanvasElement) {
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }
    context.font = `${this.fontSize}px ${this.font}`;
    context.textAlign = "center";
    context.fillStyle = this.fillColor;
    context.fillText(this.text, this.x, this.y);
  }
}
