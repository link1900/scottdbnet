import React from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { SitePage } from "../../components/SitePage";
import { ConwayWorld } from "./ConwayWorld";

interface Props {}

const CANVAS_SIZE = 600;

export class GameOfLife extends React.Component<Props> {
  // @ts-ignore
  private world: ConwayWorld;

  constructor(props: Props) {
    super(props);
  }

  public componentDidMount() {
    const canvas = this.refs.gameCanvas as HTMLCanvasElement;
    this.world = new ConwayWorld({
      canvas,
      height: CANVAS_SIZE,
      width: CANVAS_SIZE,
      gridSize: 100,
      boundType: "wrap",
      cellBorder: false,
      framesPerSecond: 15
    });
    this.world.start();
  }

  public render() {
    return (
      <SitePage>
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item>
            <Typography>Conways Game of Life</Typography>
          </Grid>
          <Grid item>
            <canvas
              ref="gameCanvas"
              width={CANVAS_SIZE}
              height={CANVAS_SIZE}
              style={{ border: "black solid 1px" }}
            />
          </Grid>
          <Grid item>
            <Grid container spacing={2} direction="row">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => this.world.start()}
                >
                  Start
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => this.world.stop()}
                >
                  Stop
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => this.world.step()}
                >
                  Step
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => this.world.reset()}
                >
                  Restart
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </SitePage>
    );
  }
}
