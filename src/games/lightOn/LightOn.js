import React from 'react';
import { Button, Select, MenuItem } from 'material-ui';
import _ from 'lodash';
import SimpleCanvas from '../simpleCanvas/SimpleCanvas';
import LightOnRect from './LightOnRect';

export default class LightOn extends React.Component {
    constructor(props) {
        super(props);
        const gridSize = 3;
        this.state = {
            grid: new Array(gridSize * gridSize).fill(false),
            gridSize,
            value: 1,
            clicks: 0,
            hasWon: false
        };
    }

    handleSizeChange = event => {
        const value = event.target.value;
        this.setState({ value });
        let gridSize = 3;
        if (value === 1) {
            gridSize = 3;
        }
        if (value === 2) {
            gridSize = 4;
        }
        if (value === 3) {
            gridSize = 5;
        }
        this.setState({ gridSize });
        this.restart(gridSize);
    };

    handleClick(x, y) {
        const updatedGrid = _.cloneDeep(this.state.grid);
        const indexesToUpdate = [];
        indexesToUpdate.push(this.gridCoordinatesToIndex(x, y));
        indexesToUpdate.push(this.gridCoordinatesToIndex(x - 1, y));
        indexesToUpdate.push(this.gridCoordinatesToIndex(x + 1, y));
        indexesToUpdate.push(this.gridCoordinatesToIndex(x, y - 1));
        indexesToUpdate.push(this.gridCoordinatesToIndex(x, y + 1));
        indexesToUpdate.filter(i => i);
        console.log(indexesToUpdate);
        indexesToUpdate.forEach(indexToUpdate => {
            updatedGrid[indexToUpdate] = !updatedGrid[indexToUpdate];
        });
        this.setState({
            grid: updatedGrid,
            clicks: this.state.clicks + 1,
            hasWon: _.every(updatedGrid)
        });
    }

    gridCoordinatesToIndex(x, y) {
        if (x >= 0 && x < this.state.gridSize && y >= 0 && y < this.state.gridSize) {
            const result = x + this.state.gridSize * y;
            return result >= 0 && result < this.state.grid.length ? result : null;
        } else {
            return null;
        }
    }

    calculateScore() {
        const base = this.state.value * 10;
        const clicksOffPar = this.state.clicks - 5;
        return base - clicksOffPar;
    }

    restart(gridSize) {
        this.setState({
            grid: new Array(gridSize * gridSize).fill(false),
            clicks: 0,
            hasWon: false
        });
    }

    render() {
        const size = 100;
        const elements = [];
        const canvasWidth = 100 * 4;
        const canvasHeight = 100 * 3;
        for (let y = 0; y < this.state.gridSize; y += 1) {
            for (let x = 0; x < this.state.gridSize; x += 1) {
                elements.push(
                    new LightOnRect({
                        name: `${x}-${y}`,
                        x: x * size,
                        y: y * size,
                        width: size,
                        height: size,
                        fillColor: '#FFFFFF',
                        gridx: x,
                        gridy: y
                    })
                );
            }
        }

        // elements.push(
        //     new CanvasText({
        //         name: 'playerScore',
        //         x: 330,
        //         y: 30,
        //         text: "Hello There",
        //         fontSize: 20
        //     })
        // );
        //
        // elements.push(
        //     new CanvasText({
        //         name: 'winText',
        //         size: 20,
        //         x: 330,
        //         y: 40,
        //         text: 'You win! Click to continue!',
        //         visible: false
        //     })
        // );

        return (
            <div className="top-margin aligner">
                <div className="aligner-item">
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ width: '400px' }} />
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                paddingRight: '100px'
                            }}
                        >
                            <Select value={this.state.value} onChange={this.handleSizeChange}>
                                <MenuItem value={1}>Easy</MenuItem>
                                <MenuItem value={2}>Medium</MenuItem>
                                <MenuItem value={3}>Hard</MenuItem>
                            </Select>
                            <SimpleCanvas
                                width={canvasWidth}
                                height={canvasHeight}
                                elements={elements}
                            />
                            <Button
                                variant="raised"
                                color="primary"
                                style={{ marginTop: '10px' }}
                                onClick={() => this.restart(this.state.gridSize)}
                            >
                                {this.state.hasWon ? 'Again?' : 'Restart'}
                            </Button>
                            {this.state.hasWon ? (
                                <span style={{ paddingTop: '10px' }}> You won in {this.state.clicks} clicks</span>
                            ) : (
                                <span style={{ paddingTop: '10px' }}> Clicks: {this.state.clicks}</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
