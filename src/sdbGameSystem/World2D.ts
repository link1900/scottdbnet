import Shape from './Shape';
import { World, WorldProps } from './World';

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
    this.height = 600;
    this.width = 600;
    this.backgroundColor = backgroundColor;
    this.boundType = boundType;
    this.canvas = canvas;
    this.mouseEngaged = false;
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('unable to get render context');
    }

    this.canvas.addEventListener('mousedown', (event: MouseEvent) => {
      this.mouseEngaged = true;
      this.onClick(event);
    });

    this.canvas.addEventListener('mousemove', (event: MouseEvent) => {
      if (this.mouseEngaged) {
        this.onClick(event);
      }
    });

    this.canvas.addEventListener('mouseup', (event: MouseEvent) => {
      this.mouseEngaged = false;
    });

    this.canvas.addEventListener('mouseleave', (event: MouseEvent) => {
      this.mouseEngaged = false;
    });


    this.renderContext = context;
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
