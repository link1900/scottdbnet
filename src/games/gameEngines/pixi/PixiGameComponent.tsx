import { Box, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useRef, useEffect, useState } from "react";
import { PixiGame, PixiGameOptions } from "./PixiGame";

export interface PixiGameComponentProps {
  setupPixi: (app: PixiGame) => Promise<void>;
  width: number;
  height: number;
  options?: PixiGameOptions;
}

const useStyles = makeStyles((theme) => ({
  loadingArea: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    flexDirection: "row",
    background: "black"
  },
  placeholder: {
    position: "absolute",
    // top: 0,
    // left: 0,
    // width: "100%",
    // height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
    transition: "opacity 0.5s ease"
  },
  fadeOut: {
    opacity: 0
  },
  hidden: {
    visibility: "hidden"
  }
}));

export function PixiGameComponent(props: PixiGameComponentProps) {
  const { setupPixi, width, height } = props;
  const classes = useStyles();
  const pixiContainer = useRef(null);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [pixiLoaded, setPixiLoaded] = useState(false);

  useEffect(() => {
    const { current: container } = pixiContainer;
    if (!container) return;

    // Create a Pixi application
    let game: PixiGame | undefined;

    const loadGame = async () => {
      game = new PixiGame({
        pixiOptions: {
          width,
          height
        }
      });
      await game.init();
      (container as any).appendChild(game.pixiApp.canvas);
      await setupPixi(game);
      game.start();
      setPixiLoaded(true);
    };

    if (isLoading) {
      loadGame();
    }

    return () => {
      // Cleanup when component unmounts
      if (game !== undefined) {
        game.stop();
        game.kill();
        game = undefined;
      }
    };
  }, [setupPixi, isLoading, width, height]);

  const startGame = () => {
    setIsLoading(true);
  };

  return (
    <div>
      {!pixiLoaded ? (
        <div
          className={`${classes.placeholder} ${
            pixiLoaded ? classes.fadeOut : ""
          }`}
          style={{ minHeight: height, minWidth: width }}
        >
          <Grid
            container
            spacing={2}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => startGame()}
            >
              Start
            </Button>
          </Grid>
        </div>
      ) : null}
      <div
        className={pixiLoaded ? "" : classes.hidden}
        style={{ minHeight: height, minWidth: width }}
        ref={pixiContainer}
      ></div>
    </div>
  );
}
