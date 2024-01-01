import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import React from "react";
import every from "lodash/every";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from "@material-ui/core";
import { PageLayout } from "../../components/PageLayout";
import { Row } from "../../components/Row";
import { Stack } from "../../components/Stack";
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
      this.state.gridElements.forEach((gridElement) => {
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
      <PageLayout title="Light On">
        <Stack align="center">
          <SimpleCanvas
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            elements={this.state.gridElements}
          />
          <Row spacing={4}>
            <FormControl>
              <InputLabel id="difficultly-label">Difficultly</InputLabel>
              <Select
                labelId="difficultly-label"
                id="difficultly-select"
                value={this.state.value}
                onChange={(event: any) => this.handleSizeChange(event)}
              >
                <MenuItem value={"easy"}>Easy</MenuItem>
                <MenuItem value={"medium"}>Medium</MenuItem>
                <MenuItem value={"hard"}>Hard</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => this.restart(this.state.gridSize)}
            >
              {this.state.hasWon ? "Again?" : "Restart"}
            </Button>
          </Row>
          {this.state.hasWon ? (
            <Typography> You won in {this.state.clicks} clicks</Typography>
          ) : (
            <Typography> Clicks: {this.state.clicks}</Typography>
          )}
        </Stack>
      </PageLayout>
    );
  }
}
