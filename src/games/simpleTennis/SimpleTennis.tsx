import React from "react";
import { PageLayout } from "../../components/PageLayout";
import { Stack } from "../../components/Stack";
import SimpleTennisGame from "./SimpleTennisGame";

interface Props {}

interface State {}

export default class SimpleTennis extends React.Component<Props, State> {
  public componentDidMount() {
    const canvas = this.refs.gameCanvas;
    const gameState = new SimpleTennisGame(canvas);
    gameState.start();
  }

  public render() {
    return (
      <PageLayout title="Simple Tennis">
        <Stack align="center">
          <canvas
            ref="gameCanvas"
            width="800"
            height="600"
            style={{ border: "black solid 1px" }}
          />
        </Stack>
      </PageLayout>
    );
  }
}
