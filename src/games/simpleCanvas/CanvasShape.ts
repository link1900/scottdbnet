import CanvasElement from './CanvasElement';
import { CanvasElementProps } from './CanvasElement';

export interface CanvasShapeProps extends CanvasElementProps {
    x?: number;
    y?: number;
    xSpeed?: number;
    ySpeed?: number;
    height?: number;
    width?: number;
    fillColor?: string;
    lineColor?: string;
    facingDegree?: number;
}

export default class CanvasShape extends CanvasElement {
    public x: number;
    public y: number;
    public xSpeed: number;
    public ySpeed: number;
    public height: number;
    public width: number;
    public fillColor: string;
    public lineColor: string;
    public facingDegree: number;

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

    public containsPoint(pointX: number, pointY: number): boolean {
        return pointY > this.top && pointY < this.bottom && pointX > this.left && pointX < this.right;
    }
}
