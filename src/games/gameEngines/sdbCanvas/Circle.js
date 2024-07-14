import Shape from "./Shape";

export default class Circle extends Shape {
  constructor(props) {
    super(props);
    const { radius } = props;
    this.radius = radius;
    this.width = radius * 2;
    this.height = radius * 2;
  }

  render() {
    if (!this.visible) {
      return null;
    }
    const { context } = this.state;
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(
      this.x + this.width / 2,
      this.y + this.height / 2,
      this.radius,
      0,
      Math.PI * 2,
      true
    );
    context.fill();
    return null;
  }
}
