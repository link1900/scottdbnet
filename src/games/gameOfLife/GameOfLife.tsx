import React from 'react';
import { Button } from '@material-ui/core';
import PageFlow from '../../UI/PageFlow';
import Spacing from '../../UI/Spacing';
import Row from '../../UI/Row';
import HeadlineLarge from '../../UI/HeadlineLarge';
import DoubleSpacing from '../../UI/DoubleSpacing';
import { ConwayWorld } from './ConwayWorld';

interface Props {}

const CANVAS_SIZE = 600;

export default class GameOfLife extends React.Component<Props> {
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
      boundType: 'wrap',
      cellBorder: false,
      framesPerSecond: 15
    });
    this.world.start();

  }

  public render() {
    return (
      <PageFlow>
        <Spacing />
        <Row>
          <HeadlineLarge>Conways Game of Life</HeadlineLarge>
        </Row>
        <DoubleSpacing />
        <canvas ref="gameCanvas" width={CANVAS_SIZE} height={CANVAS_SIZE} style={{ border: 'black solid 1px' }} />
        <DoubleSpacing />
        <Row>
          <Button variant="contained" color="primary" onClick={() => this.world.start()}>
            Start
          </Button>
          <Spacing />
          <Button variant="contained" color="primary" onClick={() => this.world.stop()}>
            Stop
          </Button>
          <Spacing />
          <Button variant="contained" color="primary" onClick={() => this.world.step()}>
            Step
          </Button>
          <Spacing />
          <Button variant="contained" color="primary" onClick={() => this.world.reset()}>
            Restart
          </Button>
        </Row>
      </PageFlow>
    );
  }
}
