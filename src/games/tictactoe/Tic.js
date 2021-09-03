import React from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import "./Tic.css";
import Board from "./Board";
import { SitePage } from "../../components/SitePage";

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
    squares[i] = this.state.xIsNext ? "X" : "O";
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
      status = `Next player: ${this.state.xIsNext ? "X" : "O"}`;
    }

    return (
      <SitePage>
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item>
            <Typography>Noughts and Crosses</Typography>
          </Grid>
          <Grid item>
            <Board
              squares={current.squares}
              onClick={i => this.handleClick(i)}
            />
          </Grid>
          <Grid item>
            <Grid container spacing={2} direction="row">
              <Grid item>{status}</Grid>
              <Grid item>
                <Button variant="contained" onClick={() => this.restart()}>
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

// ========================================

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
