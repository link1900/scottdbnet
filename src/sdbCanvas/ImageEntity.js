import Shape from './Shape';

export default class ImageEntity extends Shape {
  constructor(props) {
    super(props);
    const { src } = props;
    this.src = src;
    this.loaded = true;
    this.image = new Image();
    this.image.src = src;
    this.image.onload = () => {
      this.loaded = true;
    };
  }

  render() {
    if (!this.visible || !this.loaded) {
      return null;
    }
    const { context } = this.state;
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    return null;
  }
}
