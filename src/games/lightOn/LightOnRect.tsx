import CanvasRect from '../simpleCanvas/CanvasRect';
import { CanvasRectProps } from '../simpleCanvas/CanvasRect';
import CanvasElement from '../simpleCanvas/CanvasElement';

export interface LightOnRectProps extends CanvasRectProps {
    lit?: boolean;
    gridx: number;
    gridy: number;
}

export default class LightOnRect extends CanvasRect {
    public lit: boolean;
    public gridx: number;
    public gridy: number;

    constructor({ lit = false, gridx, gridy, ...rest }: LightOnRectProps) {
        super({ ...rest });
        this.lit = lit;
        this.gridx = gridx;
        this.gridy = gridy;
    }

    public draw(canvas: HTMLCanvasElement) {
        this.fillColor = this.lit ? '#0091EA' : '#FFFFFF';
        super.draw(canvas);
    }

    public getLightOnRects(elements: CanvasElement[]): LightOnRect[] {
        return elements as LightOnRect[];
    }

    public onClick(elements: CanvasElement[]) {
        this.lit = !this.lit;
        const lightOnRects = this.getLightOnRects(elements);
        const above = lightOnRects.find(rect => rect.gridx === this.gridx && rect.gridy === this.gridy - 1);
        const below = lightOnRects.find(rect => rect.gridx === this.gridx && rect.gridy === this.gridy + 1);
        const left = lightOnRects.find(rect => rect.gridx === this.gridx - 1 && rect.gridy === this.gridy);
        const right = lightOnRects.find(rect => rect.gridx === this.gridx + 1 && rect.gridy === this.gridy);
        [above, below, left, right].forEach(rect => {
            if (rect) {
                rect.lit = !rect.lit;
            }
        });
    }
}
