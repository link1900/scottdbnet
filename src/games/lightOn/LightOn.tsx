import React from "react";
import every from "lodash/every";
import { Button, Grid, MenuItem, Select, Typography } from "@material-ui/core";
import SimpleCanvas from "../simpleCanvas/SimpleCanvas";
import LightOnRect from "./LightOnRect";

interface State {
  gridElements: LightOnRect[];
  gridSize: number;
  value: string;
  clicks: number;
  hasWon: boolean;
}

interface Props {}

const CANVAS_SIZE = 300;

export default class LightOn extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const gridSize = 3;
    this.state = {
      gridElements: this.generateLightOnRectArray(gridSize),
      gridSize,
      value: "easy",
      clicks: 0,
      hasWon: false
    };
  }

  public handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    this.setState({ value });
    let gridSize = 3;
    if (value === "easy") {
      gridSize = 3;
    }
    if (value === "medium") {
      gridSize = 4;
    }
    if (value === "hard") {
      gridSize = 5;
    }
    this.setState({ gridSize });
    this.restart(gridSize);
  };

  public restart(gridSize: number) {
    this.setState({
      clicks: 0,
      hasWon: false,
      gridElements: this.generateLightOnRectArray(gridSize)
    });
  }

  public actionTaken = () => {
    const hasWon = every(this.state.gridElements, "lit");
    if (hasWon) {
      this.state.gridElements.forEach(gridElement => {
        gridElement.active = false;
      });
    }

    this.setState({
      clicks: this.state.clicks + 1,
      hasWon
    });
  };

  public generateLightOnRectArray = (gridSize: number) => {
    const size = CANVAS_SIZE / gridSize;
    const elements = [];
    for (let y = 0; y < gridSize; y += 1) {
      for (let x = 0; x < gridSize; x += 1) {
        elements.push(
          new LightOnRect({
            name: `${x}-${y}`,
            x: x * size,
            y: y * size,
            width: size,
            height: size,
            fillColor: "#FFFFFF",
            gridx: x,
            gridy: y,
            onChange: this.actionTaken
          })
        );
      }
    }
    return elements;
  };

  public render() {
    return (
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item>Light On</Grid>
        <Grid item>
          <SimpleCanvas
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            elements={this.state.gridElements}
          />
        </Grid>
        <Grid item>
          <Grid container direction="row" spacing={2}>
            <Grid item>
              <Typography>Difficultly</Typography>
            </Grid>
            <Grid item>
              <Select
                value={this.state.value}
                onChange={(event: any) => this.handleSizeChange(event)}
              >
                <MenuItem value={"easy"}>Easy</MenuItem>
                <MenuItem value={"medium"}>Medium</MenuItem>
                <MenuItem value={"hard"}>Hard</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="row" spacing={2}>
            <Grid item>
              <Button
                color="primary"
                onClick={() => this.restart(this.state.gridSize)}
              >
                {this.state.hasWon ? "Again?" : "Restart"}
              </Button>
            </Grid>
            <Grid item>
              {this.state.hasWon ? (
                <Typography> You won in {this.state.clicks} clicks</Typography>
              ) : (
                <Typography> Clicks: {this.state.clicks}</Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
