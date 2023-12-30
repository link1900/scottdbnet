import Rect from "../gameEngines/sdbCanvas/Rect";

export default class Paddle extends Rect {
  simulate() {
    if (!this.active) {
      return null;
    }
    const ball = this.state.getActorByName("ball");
    if (this.getYCenter() < ball.y) {
      this.setY(this.y + 3);
    }
    if (this.getYCenter() > ball.y + ball.height) {
      this.setY(this.y - 3);
    }

    return null;
  }
}
