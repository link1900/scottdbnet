import Entity from './Entity';

export default class Text extends Entity {
  constructor(props) {
    super(props);
    const { text, x, y, color, size = 12, font = 'serif' } = props;
    this.text = text;
    this.x = x;
    this.y = y;
    this.font = font;
    this.size = size;
    this.color = color;
  }

  render() {
    if (!this.visible) {
      return null;
    }
    const { context } = this.state;
    context.font = `${this.size}px ${this.font}`;
    context.textAlign = 'center';
    context.fillStyle = this.color;
    context.fillText(this.text, this.x, this.y);
    return null;
  }
}
