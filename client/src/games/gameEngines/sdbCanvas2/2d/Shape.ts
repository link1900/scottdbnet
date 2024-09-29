import Entity, { EntityProps } from "../base/Entity";
import { World2D } from "./World2D";

export interface ShapeProps extends EntityProps {
  x?: number;
  y?: number;
  height?: number;
  width?: number;
  color?: string;
  facingDegree?: number;
  xSpeed?: number;
  ySpeed?: number;
  world: World2D;
}

export default class Shape extends Entity {
  public x: number;
  public y: number;
  public height: number;
  public width: number;
  public color: string;
  public facingDegree: number;
  public xSpeed: number;
  public ySpeed: number;
  public world: World2D;

  constructor(props: ShapeProps) {
    super(props);
    const {
      x = 0,
      y = 0,
      xSpeed = 0,
      ySpeed = 0,
      height = 10,
      width = 10,
      color = "black",
      facingDegree = 0,
      world
    } = props;

    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.height = height;
    this.width = width;
    this.color = color;
    this.facingDegree = facingDegree;
    this.world = world;
  }

  get xCenter() {
    return this.x + this.width / 2;
  }

  get yCenter() {
    return this.y + this.height / 2;
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

  public setY(yInput: number) {
    let y = yInput;
    const maxY = this.world.height - this.height;
    const outOfBounds = y < 0 || y > maxY;
    if (outOfBounds) {
      if (this.world.boundType === "wall") {
        if (y <= 0) {
          y = 0;
        }
        if (y >= maxY) {
          y = maxY;
        }
      }
      if (this.world.boundType === "wrap") {
        if (y <= 0) {
          y = maxY - this.height;
        }
        if (y >= maxY) {
          y = 0;
        }
      }
      if (this.world.boundType === "delete") {
        this.kill();
      }
    }

    this.y = y;
  }

  public setX(xInput: number) {
    let x = xInput;
    const maxX = this.world.width - this.width;
    const outOfBounds = x < 0 || x > maxX;
    if (outOfBounds) {
      if (this.world.boundType === "wall") {
        if (x <= 0) {
          x = 0;
        }
        if (x >= maxX) {
          x = maxX;
        }
      }
      if (this.world.boundType === "wrap") {
        if (x <= 0) {
          x = maxX - this.width;
        }
        if (x >= maxX) {
          x = 0;
        }
      }
      if (this.world.boundType === "delete") {
        this.kill();
      }
    }

    this.x = x;
  }

  public containsPoint(pointX: number, pointY: number): boolean {
    return (
      pointY > this.top &&
      pointY < this.bottom &&
      pointX > this.left &&
      pointX < this.right
    );
  }

  public onClick() {}
}
