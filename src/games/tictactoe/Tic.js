import React from 'react';
import { Button } from '@material-ui/core';
import './Tic.css';
import Board from './Board';
import PageFlow from '../../UI/PageFlow';
import Spacing from '../../UI/Spacing';
import Row from '../../UI/Row';
import HeadlineLarge from '../../UI/HeadlineLarge';
import DoubleSpacing from '../../UI/DoubleSpacing';

export default class Tic extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      xIsNext: true,
      stepNumber: 0
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          squares
        }
      ]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: !(step % 2)
    });
  }

  restart() {
    this.setState({
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      xIsNext: true,
      stepNumber: 0
    });
  }

  render() {
    const { history } = this.state;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <PageFlow>
        <Spacing />
        <Row>
          <HeadlineLarge>Noughts and Crosses</HeadlineLarge>
        </Row>
        <DoubleSpacing />
        <Row>
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
        </Row>
        <Spacing />
        <Row>
          {status}. <Spacing />
          <Button variant="contained" onClick={() => this.restart()}>
            Restart
          </Button>
        </Row>
      </PageFlow>
    );
  }
}

// ========================================

function calculateWinner(squares) {
  const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function calculateCordsFromIndex(index) {
  const mapping = {
    1: { x: 1, y: 1 },
    2: { x: 2, y: 1 },
    3: { x: 3, y: 1 },
    4: { x: 1, y: 2 },
    5: { x: 2, y: 2 },
    6: { x: 3, y: 2 },
    7: { x: 1, y: 3 },
    8: { x: 2, y: 3 },
    9: { x: 3, y: 3 }
  };
  return mapping[index];
}
