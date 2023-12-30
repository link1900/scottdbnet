import Phaser from "phaser";

import { addEntity, createWorld, addComponent, System, IWorld } from "bitecs";
import { registerScene } from "../../gameEngines/phaser/PhaserSceneRegister";
import { Bot } from "../components/Bot";
import { Player } from "../components/Player";
import { Position } from "../components/Position";
import { Rotation } from "../components/Rotation";
import { Sprite } from "../components/Sprite";
import { Velocity } from "../components/Velocity";
import { createBotSystem } from "../systems/BotSystem";
import { createMovementSystem } from "../systems/MovementSystem";
import { createPlayerSystem } from "../systems/PlayerSystem";
import { createSpriteSystem } from "../systems/SpriteSystem";
import { Move } from "../components/Move";

export class TankGame extends Phaser.Scene {
  private world?: IWorld;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private spriteSystem?: System;
  private movementSystem?: System;
  private playerSystem?: System;
  private botSystem?: System;

  constructor() {
    super("TankGame");
  }

  init() {
    this.cursors = this.input.keyboard?.createCursorKeys();
  }

  preload() {
    this.load.image("tank-blue", "/assets/tanks/blue.png");
    this.load.image("tank-green", "/assets/tanks/green.png");
    this.load.image("tank-red", "/assets/tanks/red.png");
  }

  create() {
    this.world = createWorld();
    const world = this.world;

    // create entities
    const tank = addEntity(world);

    // attach components
    addComponent(world, Position, tank);
    Position.x[tank] = 100;
    Position.y[tank] = 100;

    addComponent(world, Rotation, tank);
    addComponent(world, Move, tank);

    addComponent(world, Velocity, tank);
    Velocity.x[tank] = 0;
    Velocity.y[tank] = 0;

    addComponent(world, Sprite, tank);
    Sprite.texture[tank] = 0;

    addComponent(world, Player, tank);

    // add bots
    const { width, height } = this.scale;
    for (let i = 0; i < 20; i++) {
      const botTank = addEntity(this.world);
      addComponent(this.world, Position, botTank);
      Position.x[botTank] = Phaser.Math.Between(width * 0.25, width * 0.75);
      Position.y[botTank] = Phaser.Math.Between(height * 0.25, height * 0.75);

      addComponent(world, Move, botTank);

      addComponent(this.world, Rotation, botTank);
      Rotation.angle[botTank] = 0;

      addComponent(world, Velocity, botTank);
      Velocity.x[botTank] = 0;
      Velocity.y[botTank] = 0;

      addComponent(this.world, Sprite, botTank);
      Sprite.texture[botTank] = Phaser.Math.Between(1, 2);

      addComponent(this.world, Bot, botTank);
      Bot.timeBetweenActions[botTank] = Phaser.Math.Between(0, 500);
    }

    // create systems
    this.spriteSystem = createSpriteSystem(this, [
      "tank-blue",
      "tank-green",
      "tank-red"
    ]);

    this.movementSystem = createMovementSystem();
    if (this.cursors) {
      this.playerSystem = createPlayerSystem(this.cursors);
    }

    this.botSystem = createBotSystem(this);
  }

  update() {
    if (
      !this.world ||
      !this.spriteSystem ||
      !this.movementSystem ||
      !this.playerSystem ||
      !this.botSystem
    ) {
      return;
    }
    this.playerSystem(this.world);
    this.botSystem(this.world);
    this.movementSystem(this.world);
    this.spriteSystem(this.world);
  }
}

registerScene("TankMain", TankGame);
