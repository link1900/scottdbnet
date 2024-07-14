const MovementMixin = (Base) =>
  class extends Base {
    constructor(props) {
      super(props);
      const { speedX, speedY } = props;
      this.speedX = speedX;
      this.speedY = speedY;
    }
  };

export default MovementMixin;
