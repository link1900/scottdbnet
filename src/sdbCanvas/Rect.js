import Shape from './Shape';

export default class Rect extends Shape {
  render() {
    if (!this.visible) {
      return null;
    }
    const { context } = this.state;
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
    return null;
  }
}
