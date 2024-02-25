import React, { useRef, useEffect } from "react";
import { createPixiGame, PixiGame } from "./PixiGame";

export interface PixiGameComponentProps {
  runPixi: (app: PixiGame) => void;
  width: number;
  height: number;
}

export function PixiGameComponent(props: PixiGameComponentProps) {
  const { runPixi, width, height } = props;
  const pixiContainer = useRef(null);

  useEffect(() => {
    const { current: container } = pixiContainer;
    if (!container) return;

    // Create a Pixi application
    const game = createPixiGame({
      appOptions: {
        width,
        height,
        backgroundColor: "#1099bb"
      }
    });

    // @ts-ignore
    container.appendChild(game.app.view);

    runPixi(game);

    return () => {
      // Cleanup when component unmounts
      game.app.destroy(true);
    };
  }, [runPixi, width, height]);

  return <div ref={pixiContainer}></div>;
}
