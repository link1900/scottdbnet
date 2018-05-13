// @flow
import type { CanvasShapeProps } from "./CanvasShape";
import CanvasShape from "./CanvasShape";

export type CanvasRectProps = {

} & CanvasShapeProps;

export default class CanvasRect extends CanvasShape {

    constructor({
        ...rest
    }: CanvasShapeProps) {
        super({ ...rest });
    }

    draw(canvas: HTMLCanvasElement) {
        const context = canvas.getContext('2d');
        context.fillStyle = this.fillColor;
        context.fillRect(this.x, this.y, this.width, this.height);
        context.strokeStyle = this.lineColor;
        context.strokeRect(this.x, this.y, this.width, this.height);
    }
}
