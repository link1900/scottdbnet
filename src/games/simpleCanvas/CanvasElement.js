// @flow
/* eslint no-unused-vars: 0 */
import shortid from 'shortid';

export type CanvasElementProps = {
    id?: string,
    name?: string,
    visible?: boolean,
    active?: boolean
};

export default class CanvasElement {
    id: string;
    name: string;
    visible: boolean;
    active: boolean;

    constructor({ id = shortid.generate(), name = '', visible = true, active = true }: CanvasElementProps) {
        this.id = id;
        this.name = name;
        this.visible = visible;
        this.active = active;
    }

    _draw(canvas: HTMLCanvasElement) {
        if (this.visible) {
            this.draw(canvas);
        }
    }

    _simulate(elements: Array<CanvasElement>) {
        if (this.active) {
            this.simulate(elements);
        }
    }

    draw(canvas: HTMLCanvasElement) {}

    simulate(elements: Array<CanvasElement>) {}

    enable() {
        this.visible = true;
        this.active = true;
    }

    disable() {
        this.visible = false;
        this.active = false;
    }

    onClick(elements: Array<CanvasElement>) {}

    containsPoint(pointX: number, pointY: number): boolean {
        return false;
    }
}
