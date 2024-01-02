import React from "react";
import { Button } from "@material-ui/core";
import { PageLayout } from "../../components/PageLayout";
import { Stack } from "../../components/Stack";
import { ConwayWorld } from "./ConwayWorld";
import { Row } from "../../components/Row";

interface Props {}

const CANVAS_SIZE = 600;

export default class GameOfLife extends React.Component<Props> {
  // @ts-ignore
  private world: ConwayWorld;

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
      <PageLayout title="Conways Game of Life">
        <Stack align="center" spacing={2}>
          <canvas
            ref="gameCanvas"
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            style={{ border: "black solid 1px" }}
          />
          <Row spacing={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.world.start()}
            >
              Start
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.world.stop()}
            >
              Stop
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.world.step()}
            >
              Step
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.world.reset()}
            >
              Restart
            </Button>
          </Row>
        </Stack>
      </PageLayout>
    );
  }
}
