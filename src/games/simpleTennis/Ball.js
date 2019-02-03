import Circle from '../../sdbCanvas/Circle';
import MovementMixin from '../../sdbCanvas/MovementMixin';

export default class Ball extends MovementMixin(Circle) {
  increaseScore(score) {
    const { screen } = this.state;
    score.text += 1;
    if (score.text >= this.state.maxScore) {
      const winText = this.state.getActorByName('winText');
      if (score.name === 'playerScore') {
        winText.text = 'Player wins! Click to continue';
      }
      if (score.name === 'aiScore') {
        winText.text = 'Computer wins! Click to continue';
      }
      this.state.gameOver();
    }
    this.speedX = -this.speedX;
    this.speedY = 0;
    this.x = screen.width / 2;
    this.y = screen.height / 2;
  }

  simulate() {
    if (!this.active) {
      return null;
    }
    const { screen } = this.state;
    const playerPaddle = this.state.getActorByName('playerPaddle');
    const aiPaddle = this.state.getActorByName('aiPaddle');
    const playerScore = this.state.getActorByName('playerScore');
    const aiScore = this.state.getActorByName('aiScore');
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.intersects(playerPaddle)) {
      this.speedX = -this.speedX;
      const deltaY = this.y - playerPaddle.getYCenter();
      this.speedY = deltaY * 0.35;
    } else if (this.intersects(aiPaddle)) {
      this.speedX = -this.speedX;
      const deltaY = this.y - aiPaddle.getYCenter();
      this.speedY = deltaY * 0.35;
    } else if (!this.intersects(screen)) {
      if (this.x < 0) {
        this.increaseScore(aiScore);
      }
      if (this.x > screen.width) {
        this.increaseScore(playerScore);
      }
    }

    if (this.y > screen.height - this.height) {
      this.speedY = -this.speedY;
    }
    if (this.y < 0) {
      this.speedY = -this.speedY;
    }

    return null;
  }
}
