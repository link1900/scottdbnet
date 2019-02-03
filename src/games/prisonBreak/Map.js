import React from 'react';
import './commandLine.css';
import SimpleCanvas from '../simpleCanvas/SimpleCanvas';
import GridRect from '../simpleCanvas/GridRect';
import CanvasRect from '../simpleCanvas/CanvasRect';
import { flatten } from 'lodash';

function getBorderTop(cell) {
  if (!cell || !cell.borderTop || !cell.borderTop.show) {
    return null;
  }
  const { size, x, y } = cell;
  const gridX = x * size;
  const gridY = y * size;
  return new CanvasRect({ fillColor: cell.borderTop.color, x: gridX, y: gridY, width: size, height: 1 });
}

function getBorderBottom(cell) {
  if (!cell || !cell.borderBottom || !cell.borderBottom.show) {
    return null;
  }
  const { size, x, y } = cell;
  const gridX = x * size;
  const gridY = y * size;

  return new CanvasRect({ fillColor: cell.borderBottom.color, x: gridX, y: gridY + size, width: size, height: 1 });
}

function getBorderLeft(cell) {
  if (!cell || !cell.borderLeft || !cell.borderLeft.show) {
    return null;
  }
  const { size, x, y } = cell;
  const gridX = x * size;
  const gridY = y * size;
  return new CanvasRect({ fillColor: cell.borderLeft.color, x: gridX, y: gridY, width: 1, height: size });
}

function getBorderRight(cell) {
  if (!cell || !cell.borderRight || !cell.borderRight.show) {
    return null;
  }
  const { size, x, y } = cell;
  const gridX = x * size;
  const gridY = y * size;
  return new CanvasRect({ fillColor: cell.borderRight.color, x: gridX + size, y: gridY, width: 1, height: size });
}

function getCells(cellSize, cells) {
  return flatten(
    cells
      .map(cell => {
        const { x, y, size, show } = cell;
        if (!show) {
          return null;
        }
        return [
          new GridRect({
            gridx: x,
            gridy: y,
            x: x * size,
            y: y * size,
            width: size,
            height: size,
            lineColor: '#BAB7B6',
            fillColor: '#BAB7B6'
          })
        ]
          .concat(getBorderTop(cell))
          .concat(getBorderBottom(cell))
          .concat(getBorderLeft(cell))
          .concat(getBorderRight(cell));
      })
      .filter(c => c)
  ).filter(c => c);
}

function getCurrentLocation(currentLocationX, currentLocationY, cellSize) {
  return new GridRect({
    gridx: currentLocationX,
    gridy: currentLocationY,
    x: currentLocationX * cellSize + cellSize / 2 / 2,
    y: currentLocationY * cellSize + cellSize / 2 / 2,
    width: cellSize / 2,
    height: cellSize / 2,
    lineColor: 'blue',
    fillColor: 'blue'
  });
}

export default class Map extends React.Component {
  render() {
    const { showMap, gridHeight, gridWidth, cellSize, cells, currentLocationX, currentLocationY } = this.props;
    if (!showMap) {
      return null;
    }
    const elements = getCells(cellSize, cells).concat(getCurrentLocation(currentLocationX, currentLocationY, cellSize));
    return (
      <div style={{ margin: '30px' }}>
        <SimpleCanvas width={cellSize * gridWidth} height={cellSize * gridHeight} elements={elements} />
      </div>
    );
  }
}
