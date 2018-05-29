// @flow
import CanvasRect from '../simpleCanvas/CanvasRect';
import type { CanvasRectProps } from '../simpleCanvas/CanvasRect';
import CanvasElement from '../simpleCanvas/CanvasElement';

export type LightOnRectProps = {
    lit?: boolean,
    gridx: number,
    gridy: number
} & CanvasRectProps;

export default class LightOnRect extends CanvasRect {
    lit: boolean;
    gridx: number;
    gridy: number;

    constructor({ lit = false, gridx, gridy, ...rest }: LightOnRectProps) {
        super({ ...rest });
        this.lit = lit;
        this.gridx = gridx;
        this.gridy = gridy;
    }

    draw(canvas: HTMLCanvasElement) {
        this.fillColor = this.lit ? '#0091EA' : '#FFFFFF';
        super.draw(canvas);
    }

    getLightOnRects(elements: Array<CanvasElement>): Array<LightOnRect> {
        return ((elements.filter(e => e instanceof LightOnRect): Array<any>): Array<LightOnRect>);
    }

    onClick(elements: Array<CanvasElement>) {
        this.lit = !this.lit;
        const lightOnRects = this.getLightOnRects(elements);
        const above = lightOnRects.find(rect => rect.gridx === this.gridx && rect.gridy === this.gridy - 1);
        const below = lightOnRects.find(rect => rect.gridx === this.gridx && rect.gridy === this.gridy + 1);
        const left = lightOnRects.find(rect => rect.gridx === this.gridx - 1 && rect.gridy === this.gridy);
        const right = lightOnRects.find(rect => rect.gridx === this.gridx + 1 && rect.gridy === this.gridy);
        [above, below, left, right].filter(Boolean).forEach(rect => {
            rect.lit = !rect.lit;
        });
    }
}
