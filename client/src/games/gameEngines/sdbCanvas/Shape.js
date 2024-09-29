import get from "lodash/get";
import Entity from "./Entity";

export default class Shape extends Entity {
  constructor(props) {
    super(props);
    const {
      x = 10,
      y = 10,
      xSpeed = 0,
      ySpeed = 0,
      height = 10,
      width = 10,
      color = "black",
      facingDegree = 0
    } = props;

    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.height = height;
    this.width = width;
    this.color = color;
    this.facingDegree = facingDegree;
  }

  getXCenter() {
    return this.x + this.width / 2;
  }

  getXWidth() {
    return this.x + this.width;
  }

  getYCenter() {
    return this.y + this.height / 2;
  }

  getYHeight() {
    return this.y + this.height;
  }

  setY(y, options) {
    const boundType = get(options, "boundType", "none");
    const maxY = this.state.screen.height - this.height;
    const outOfBounds = y < 0 || y > maxY;
    if (outOfBounds) {
      if (boundType === "screen") {
        if (y <= 0) {
          y = 0;
        }
        if (y >= maxY) {
          y = maxY;
        }
      }
      if (boundType === "delete") {
        this.state.actors = this.state.actors.filter(
          (actor) => actor.name !== this.name
        );
      }
    }

    this.y = y;
  }

  setX(x, options) {
    const boundType = get(options, "boundType", "none");
    const maxX = this.state.screen.width - this.width;
    const outOfBounds = x < 0 || x > maxX;
    if (outOfBounds) {
      if (boundType === "screen") {
        if (x <= 0) {
          x = 0;
        }
        if (x >= maxX) {
          x = maxX;
        }
      }
      if (boundType === "delete") {
        this.state.actors = this.state.actors.filter(
          (actor) => actor.name !== this.name
        );
      }
    }

    this.x = x;
  }

  intersects(shape) {
    if (shape instanceof Shape) {
      const leftOfShape = this.getXWidth() < shape.x;
      const rightOfShape = this.x > shape.getXWidth();
      const aboveShape = this.y > shape.getYHeight();
      const belowShape = this.getYHeight() < shape.y;
      return !(leftOfShape || rightOfShape || aboveShape || belowShape);
    }

    return false;
  }
}
