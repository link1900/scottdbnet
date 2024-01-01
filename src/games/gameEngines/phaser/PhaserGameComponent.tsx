import React, { ReactElement, useEffect } from "react";
import Phaser from "phaser";
import { getScenes } from "./PhaserSceneRegister";

export interface Phaser3GameComponentProps {
  sceneNames: string[];
  width: number;
  height: number;
}

export function PhaserGameComponent(
  props: Phaser3GameComponentProps
): ReactElement {
  const { sceneNames, width, height } = props;
  useEffect(() => {
    const scene = getScenes(sceneNames);
    const game = new Phaser.Game({
      type: Phaser.AUTO,
      backgroundColor: "#282c34",
      seed: [(Date.now() * Math.random()).toString()],
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: "phaser",
        width: "100%",
        height: "100%"
      },
      scene,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 }
        }
      },
      pixelArt: true
    });

    return () => {
      game.destroy(true);
    };
  }, [sceneNames]);

  return <div id="phaser" style={{ width, height }} />;
}
