import Shape from './Shape';
import { World, WorldProps } from '../base/World';

export type BoundType = 'wall' | 'wrap' | 'delete';

export interface World2DProps extends WorldProps {
  height?: number;
  width?: number;
  backgroundColor?: string;
  boundType?: BoundType;
  canvas: HTMLCanvasElement;
}

export class World2D extends World {
  public height: number;
  public width: number;
  public backgroundColor: string;
  public boundType: BoundType;
  public canvas: HTMLCanvasElement;
  public renderContext: CanvasRenderingContext2D;
  public mouseEngaged: boolean;

  constructor(props: World2DProps) {
    super(props);
    const { height = 600, width = 600, backgroundColor = 'white', boundType = 'delete', canvas } = props;
    this.height = height;
    this.width = width;
    this.backgroundColor = backgroundColor;
    this.boundType = boundType;
    this.canvas = canvas;
    this.mouseEngaged = false;
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('unable to get render context');
    }
    this.canvas.addEventListener('mousedown', (event) => this.mouseDown(event));
    this.canvas.addEventListener('mousemove', (event) => this.mouseMove(event));
    this.canvas.addEventListener('mouseup', (event) => this.mouseUp(event));
    this.canvas.addEventListener('mouseleave', (event) => this.mouseLeave(event));
    this.renderContext = context;
  }

  public mouseDown(event: MouseEvent) {
    this.mouseEngaged = true;
    this.onClick(event);
  }

  public mouseUp(event: MouseEvent) {
    if (this.mouseEngaged) {
      this.onClick(event);
    }
  }

  public mouseMove(event: MouseEvent) {
    this.mouseEngaged = false;
  }

  public mouseLeave(event: MouseEvent) {
    this.mouseEngaged = false;
  }

  public destroy() {
    super.destroy();
  }

  public getMousePosition(event: MouseEvent) {
    const mouseX = event.pageX - this.canvas.offsetLeft;
    const mouseY = event.pageY - this.canvas.offsetTop;
    return { mouseX, mouseY };
  }

  public onClick(event: MouseEvent) {
    const { mouseX, mouseY } = this.getMousePosition(event);
    this.entities.forEach(entity => {
      if (entity instanceof Shape) {
        if (entity.containsPoint(mouseX, mouseY)) {
          entity.onClick();
        }
      }
    });
  }
}
