import Rect from "../sdbCanvas/Rect";
import Ball from "./Ball";
import PlayerPaddle from "./PlayerPaddle";
import Paddle from "./Paddle";
import Text from "../sdbCanvas/Text";

export default class SimpleTennisGame {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.actors = [];
    this.maxScore = 3;
    this.screen = new Rect({
      state: this,
      height: canvas.height,
      width: canvas.width,
      x: 0,
      y: 0,
      color: "black",
      type: "rect"
    });

    for (let i = 0; i < this.screen.height; i += 40) {
      this.actors.push(
        new Rect({
          state: this,
          name: `net${i}`,
          x: this.screen.width / 2 - 1,
          y: i,
          width: 2,
          height: 20,
          color: "white"
        })
      );
    }

    this.actors.push(
      new Ball({
        state: this,
        name: "ball",
        speedX: 6,
        speedY: 0,
        color: "white",
        x: (this.screen.getXCenter() - 20) / 2,
        y: (this.screen.getYCenter() - 20) / 2,
        radius: 10
      })
    );

    this.actors.push(
      new PlayerPaddle({
        state: this,
        name: "playerPaddle",
        x: 0,
        y: this.screen.getYCenter() - 50,
        height: 100,
        width: 10,
        color: "white"
      })
    );

    this.actors.push(
      new Paddle({
        state: this,
        name: "aiPaddle",
        x: this.screen.width - 10,
        y: this.screen.getYCenter() - 50,
        height: 100,
        width: 10,
        color: "white"
      })
    );

    this.actors.push(
      new Text({
        state: this,
        name: "playerScore",
        x: 100,
        y: 100,
        text: 0,
        size: 20,
        color: "white"
      })
    );

    this.actors.push(
      new Text({
        state: this,
        name: "aiScore",
        x: this.screen.width - 100,
        y: 100,
        text: 0,
        size: 20,
        color: "white"
      })
    );

    this.actors.push(
      new Text({
        state: this,
        name: "winText",
        size: 30,
        x: this.screen.getXCenter(),
        y: this.screen.getYCenter(),
        text: "Player wins! Click to continue!",
        visible: false,
        color: "white"
      })
    );

    canvas.addEventListener("mousemove", (evt) => {
      const mousePos = this.calculateMousePos(evt);
      const playerPaddle = this.actors.find(
        (actor) => actor.name === "playerPaddle"
      );
      playerPaddle.setY(mousePos.y - playerPaddle.height / 2);
    });

    canvas.addEventListener("mousedown", () => {
      const winText = this.actors.find((actor) => actor.name === "winText");
      if (winText.visible) {
        this.reset();
      }
    });
  }

  start(framesPerSecond = 60) {
    setInterval(() => {
      this.simulate();
      this.render();
    }, 1000 / framesPerSecond);
  }

  gameOver() {
    const ball = this.getActorByName("ball");
    const playerPaddle = this.getActorByName("playerPaddle");
    const aiPaddle = this.getActorByName("aiPaddle");
    const winText = this.getActorByName("winText");
    ball.disable();
    playerPaddle.disable();
    aiPaddle.disable();
    winText.enable();
  }

  reset() {
    const playerScore = this.getActorByName("playerScore");
    const aiScore = this.getActorByName("aiScore");
    const ball = this.getActorByName("ball");
    const playerPaddle = this.getActorByName("playerPaddle");
    const aiPaddle = this.getActorByName("aiPaddle");
    const winText = this.getActorByName("winText");
    playerScore.text = 0;
    aiScore.text = 0;

    ball.speedX = 6;
    ball.speedY = 2;
    ball.x = this.screen.getXCenter();
    ball.y = this.screen.getYCenter();

    playerPaddle.x = 0;
    playerPaddle.y = this.screen.getYCenter() - playerPaddle.height / 2;

    aiPaddle.x = this.screen.width - aiPaddle.width;
    aiPaddle.y = this.screen.getYCenter() - aiPaddle.height / 2;

    winText.disable();
    ball.enable();
    playerPaddle.enable();
    aiPaddle.enable();
  }

  simulate() {
    this.actors.forEach((actor) => actor.simulate());
  }

  render() {
    this.screen.render();
    this.actors.forEach((actor) => actor.render());
  }

  getActorByName(name) {
    return this.actors.find((actor) => actor.name === name);
  }

  getActorsByClass(clazz) {
    return this.actors.filter((actor) => actor instanceof clazz);
  }

  calculateMousePos(evt) {
    const rect = this.canvas.getBoundingClientRect();
    const root = document.documentElement;
    const mouseX = evt.clientX - rect.left - root.scrollLeft;
    const mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
      x: mouseX,
      y: mouseY
    };
  }
}
