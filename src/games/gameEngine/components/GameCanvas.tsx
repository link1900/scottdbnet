import React from "react";
import { World } from "../base/World";

interface Props {
  height?: number;
  width?: number;
  border?: boolean;
  worldBuilder: (
    canvas: HTMLCanvasElement,
    height: number,
    width: number
  ) => World;
}

export class GameCanvas extends React.Component<Props> {
  private world: World | null = null;
  worldBuilder: (
    canvas: HTMLCanvasElement,
    height: number,
    width: number
  ) => World;
  public width: number;
  public height: number;
  public border: boolean;

  constructor(props: Props) {
    super(props);
    const { width = 600, height = 600, border = true, worldBuilder } = props;
    this.width = width;
    this.height = height;
    this.border = border;
    this.worldBuilder = worldBuilder;
  }

  public componentDidMount() {
    const canvas = this.refs.gameCanvas as HTMLCanvasElement;
    this.world = this.worldBuilder(canvas, this.height, this.width);
    this.world.start();
  }

  public componentWillUnmount() {
    this.world?.destroy();
  }

  public render() {
    return (
      <canvas
        ref="gameCanvas"
        width={this.width}
        height={this.height}
        style={{ border: this.border ? "black solid 1px" : "" }}
      />
    );
  }
}
