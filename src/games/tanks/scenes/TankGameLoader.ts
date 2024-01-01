import AssetLoaderBase from "../../gameEngines/phaser/AssetLoaderBase";
import { registerScene } from "../../gameEngines/phaser/PhaserSceneRegister";

export class TankGameLoader extends AssetLoaderBase {
  constructor() {
    super("TankGameLoader", "TankGame");
  }

  assetLoad() {
    this.load.multiatlas(
      "tankers",
      "/assets/tanks/tanker-game.json",
      "/assets/tanks"
    );
  }
}

export const TANK_GAME_LOADER = registerScene("TankGameLoader", TankGameLoader);
