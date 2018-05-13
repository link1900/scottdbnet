// @flow
import CanvasElement from './CanvasElement';
import type { CanvasElementProps } from './CanvasElement';

export type CanvasShapeProps = {
    x?: number,
    y?: number,
    xSpeed?: number,
    ySpeed?: number,
    height?: number,
    width?: number,
    fillColor?: string,
    lineColor?: string,
    facingDegree?: number
} & CanvasElementProps;

export default class CanvasShape extends CanvasElement {
    x: number;
    y: number;
    xSpeed: number;
    ySpeed: number;
    height: number;
    width: number;
    fillColor: string;
    lineColor: string;
    facingDegree: number;

    constructor({
        x = 0,
        y = 0,
        xSpeed = 0,
        ySpeed = 0,
        height = 0,
        width = 0,
        fillColor = 'black',
        lineColor = 'black',
        facingDegree = 0,
        ...rest
    }: CanvasShapeProps) {
        super({ ...rest });
        this.x = x;
        this.y = y;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.height = height;
        this.width = width;
        this.fillColor = fillColor;
        this.lineColor = lineColor;
        this.facingDegree = facingDegree;
    }

    get bottom(): number {
        return this.y + this.height;
    }

    get top(): number {
        return this.y;
    }

    get left(): number {
        return this.x;
    }

    get right(): number {
        return this.x + this.width;
    }

    containsPoint(pointX: number, pointY: number): boolean {
        return pointY > this.top && pointY < this.bottom && pointX > this.left && pointX < this.right;
    }
}
