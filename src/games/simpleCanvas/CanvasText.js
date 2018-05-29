// @flow
import type { CanvasShapeProps } from './CanvasShape';
import CanvasShape from './CanvasShape';

export type CanvasTextProps = {
    text?: string,
    font?: string,
    fontSize?: number
} & CanvasShapeProps;

export default class CanvasText extends CanvasShape {
    text: string;
    font: string;
    fontSize: number;

    constructor({ text = '', font = 'serif', fontSize = 12, ...rest }: CanvasTextProps) {
        super({ ...rest });
        this.text = text;
        this.font = font;
        this.fontSize = fontSize;
    }

    draw(canvas: HTMLCanvasElement) {
        const context = canvas.getContext('2d');
        context.font = `${this.fontSize}px ${this.font}`;
        context.textAlign = 'center';
        context.fillStyle = this.fillColor;
        context.fillText(this.text, this.x, this.y);
    }
}
