import React, { useRef, useEffect } from "react";
import { PixiGame } from "./PixiGame";

export interface PixiGameComponentProps {
  setupPixi: (app: PixiGame) => Promise<void>;
  width: number;
  height: number;
}

export function PixiGameComponent(props: PixiGameComponentProps) {
  const { setupPixi, width, height } = props;
  const pixiContainer = useRef(null);

  useEffect(() => {
    const { current: container } = pixiContainer;
    if (!container) return;

    // Create a Pixi application
    const game = new PixiGame({
      pixiOptions: {
        width,
        height,
        backgroundColor: "#1099bb"
      }
    });

    const loadGame = async () => {
      await game.init();
      (container as any).appendChild(game.pixiApp.canvas);
      await setupPixi(game);
      game.start();
    };

    loadGame();

    return () => {
      // Cleanup when component unmounts
      game.stop();
      game.kill();
    };
  }, [setupPixi, width, height]);

  return <div ref={pixiContainer}></div>;
}
