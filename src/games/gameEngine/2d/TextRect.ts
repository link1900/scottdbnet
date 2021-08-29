import { Rect, RectProps } from './Rect';

export interface TextRectProps extends RectProps {
  text?: string;
  font?: string;
  textSize?: number;
  textColor?: string;
  textAlign?: string;
}

export class TextRect extends Rect {
  public text: string;
  public font?: string;
  public textSize?: number;
  public textAlign?: string;
  public textColor: string;

  constructor(props: TextRectProps) {
    super(props);
    const { text = '', color = 'white', textColor = 'black', font = 'serif', textSize = 20, textAlign = 'center' } = props;
    this.color = color;
    this.text = text;
    this.font = font;
    this.textSize = textSize;
    this.textAlign = textAlign;
    this.textColor = textColor;
  }

  public render() {
    super.render();
    const context = this.world.renderContext;
    context.font = `${this.textSize}px ${this.font}`;
    context.textAlign = 'center';
    context.fillStyle = this.textColor;
    context.fillText(this.text, this.x, this.y);
  }
}
