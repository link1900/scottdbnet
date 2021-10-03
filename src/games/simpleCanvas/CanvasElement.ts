import { v4 as uuid } from "uuid";

export interface CanvasElementProps {
  id?: string;
  name?: string;
  visible?: boolean;
  active?: boolean;
}

export default class CanvasElement {
  public id: string;
  public name: string;
  public visible: boolean;
  public active: boolean;

  constructor({
    id = uuid(),
    name = "",
    visible = true,
    active = true
  }: CanvasElementProps) {
    this.id = id;
    this.name = name;
    this.visible = visible;
    this.active = active;
  }

  public _draw(canvas: HTMLCanvasElement) {
    if (this.visible) {
      this.draw(canvas);
    }
  }

  public _simulate(elements: CanvasElement[]) {
    if (this.active) {
      this.simulate(elements);
    }
  }

  public draw(canvas: HTMLCanvasElement) {}

  public simulate(elements: CanvasElement[]) {}

  public enable() {
    this.visible = true;
    this.active = true;
  }

  public disable() {
    this.visible = false;
    this.active = false;
  }

  public onClick(elements: CanvasElement[]) {}

  public containsPoint(pointX: number, pointY: number): boolean {
    return false;
  }
}
