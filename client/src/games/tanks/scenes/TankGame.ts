import { createWorld, IWorld, System } from "bitecs";
import Phaser from "phaser";
import { registerScene } from "../../gameEngines/phaser/PhaserSceneRegister";
import { createBot } from "../entities/BotBuilder";
import { createPlayer } from "../entities/PlayerBuilder";
import { createTree } from "../entities/TreeBuilder";
import { createBotSystem } from "../systems/BotSystem";
import { createMovementSystem } from "../systems/MovementSystem";
import { createPlayerSystem } from "../systems/PlayerSystem";
import { TextureKeys, Textures } from "../util/textureHelper";

export class TankGame extends Phaser.Scene {
  private world?: IWorld;
  private systems?: System[];

  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super("TankGame");
  }

  init() {
    this.cursors = this.input.keyboard?.createCursorKeys();
  }

  create() {
    this.world = createWorld();
    this.systems = [];
    const systems = this.systems;
    const world = this.world;
    const spriteGroup = this.physics.add.group();
    this.physics.add.collider(spriteGroup, spriteGroup);

    // create entities

    createTree(world, { texture: Textures.TreeGreenLarge, x: 400, y: 400 });
    createTree(world, { texture: Textures.TreeBrownSmall, x: 300, y: 200 });

    createPlayer(world, {
      texture: Textures.TankBlue,
      x: 100,
      y: 100
    });

    createBot(world, {
      texture: Textures.TankGreen,
      x: 100,
      y: 400
    });

    createBot(world, {
      texture: Textures.TankRed,
      x: 400,
      y: 100
    });

    // create systems
    if (this.cursors) {
      systems.push(createPlayerSystem(this.cursors));
    }

    systems.push(createBotSystem(this));

    systems.push(createMovementSystem());
  }

  update() {
    this.systems?.forEach((s) => s(this.world!));
  }
}

export const TANK_GAME = registerScene("TankGame", TankGame);
