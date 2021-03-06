import React from 'react';
import { Button, TextField } from '@material-ui/core';
import thinkingImage from './thinking.jpg';
import PageFlow from '../../UI/PageFlow';
import Spacing from '../../UI/Spacing';
import Row from '../../UI/Row';
import { randomInteger } from '../../utils/randomHelper';

interface Props {}

interface State {
  guessCount: number;
  guessLimit: number;
  currentGuess: string;
  finished: boolean;
  theNumber: number;
  history: string;
}

export default class Guesser extends React.Component<Props, State> {
  private mainCommandInput: any;

  constructor(props: Props) {
    super(props);
    this.mainCommandInput = null;
    this.state = {
      guessCount: 0,
      guessLimit: 10,
      currentGuess: '',
      finished: false,
      theNumber: randomInteger(1, 100),
      history: ''
    };
  }

  public componentDidMount() {
    if (this.mainCommandInput) {
      this.mainCommandInput.focus();
    }
  }

  public onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      this.submitGuess();
    }
  };

  public handleInputRef = (ref: any) => {
    this.mainCommandInput = ref;
  };

  public handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      currentGuess: event.target.value
    });
  };

  public restart() {
    this.setState({
      guessCount: 0,
      guessLimit: 10,
      currentGuess: '',
      finished: false,
      theNumber: randomInteger(1, 100),
      history: ''
    });
  }

  public submitGuess() {
    const textGuess = this.state.currentGuess;
    const answer = this.state.theNumber;
    try {
      const guess = parseInt(textGuess, 10);
      if (guess === answer) {
        this.setState({
          currentGuess: '',
          history: `Your guess of ${guess} Correct!`,
          guessCount: this.state.guessCount + 1,
          finished: true
        });
      } else if (guess < answer) {
        this.setState({
          currentGuess: '',
          history: `Your guess of ${guess} is wrong. Try higher.`,
          guessCount: this.state.guessCount + 1
        });
      } else if (guess > answer) {
        this.setState({
          currentGuess: '',
          history: `Your guess of ${guess} is wrong. Try lower.`,
          guessCount: this.state.guessCount + 1
        });
      } else {
        this.setState({
          currentGuess: '',
          history: 'You entered an invalid number. Try again.'
        });
      }
    } catch (e) {
      this.setState({
        currentGuess: '',
        history: 'You entered an invalid number. Try again.'
      });
    }

    if (this.state.guessCount + 1 >= this.state.guessLimit) {
      this.setState({
        currentGuess: '',
        history: 'No more guesses left. Game over.',
        finished: true
      });
    }
  }

  public render() {
    return (
      <PageFlow>
        <Spacing />
        <img src={thinkingImage} alt="question mark" style={{ width: '320px', height: '226px' }} />
        <p>
          Can you guess the number I am thinking of? You have {this.state.guessLimit - this.state.guessCount} guesses
          left.
        </p>
        <Spacing />
        <span>{this.state.history}</span>
        <Spacing />
        {this.state.finished ? (
          <Button onClick={() => this.restart()}>Again?</Button>
        ) : (
          <Row style={{ width: '500px' }}>
            <TextField
              label="Enter a number between 1 and 100"
              value={this.state.currentGuess}
              onChange={this.handleChange}
              inputRef={this.handleInputRef}
              onKeyDown={this.onKeyDown}
              fullWidth
            />
            <Spacing />
            <Button variant="contained" onClick={() => this.submitGuess()}>
              Submit
            </Button>
            <Spacing />
            <Button variant="contained" onClick={() => this.restart()}>
              Restart
            </Button>
          </Row>
        )}
      </PageFlow>
    );
  }
}
