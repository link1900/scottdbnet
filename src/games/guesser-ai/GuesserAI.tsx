import React from 'react';
import { last } from 'lodash';
import { Button, TextField } from '@material-ui/core';
import thinkingImage from './thinkingAI.png';
import PageFlow from '../../UI/PageFlow';
import Spacing from '../../UI/Spacing';
import Row from '../../UI/Row';
import Column from '../../UI/Column';

interface Props {}

interface GuessAttempt {
  guessNumber: number;
  result: string;
}

interface State {
  input: string;
  inputError?: string;
  targetNumber?: number;
  guessCount: number;
  guessLimit: number;
  guessAttempts: GuessAttempt[];
  finished: boolean;
}

const defaultState: State = {
  input: '',
  targetNumber: undefined,
  inputError: undefined,
  guessCount: 0,
  guessLimit: 10,
  guessAttempts: [],
  finished: false
};

export default class GuesserAI extends React.Component<Props, State> {
  private mainCommandInput: any;

  constructor(props: Props) {
    super(props);
    this.mainCommandInput = null;
    this.state = { ...defaultState };
  }

  public componentDidMount() {
    if (this.mainCommandInput) {
      this.mainCommandInput.focus();
    }
  }

  public onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      this.submitAnswer();
    }
  };

  public handleInputRef = (ref: any) => {
    this.mainCommandInput = ref;
  };

  public handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      input: event.target.value
    });
  };

  public restart() {
    this.setState({ ...defaultState });
  }

  public submitAnswer() {
    const textGuess = this.state.input;
    const inputNumber = parseInt(textGuess, 10);
    if (!Number.isInteger(inputNumber) || inputNumber < 1 || inputNumber > 100) {
      return this.setState({
        inputError: 'Invalid number'
      });
    }
    this.setState({
      targetNumber: inputNumber,
      inputError: undefined
    });
    this.calculateAnswer(inputNumber, this.state.guessLimit);
  }

  public calculateAnswer(targetNumber: number, maxAttempts: number) {
    let max = 101;
    let min = 0;
    let guessAttempts: GuessAttempt[] = [];
    while (guessAttempts.length < maxAttempts) {
      const lastAttempt = last(guessAttempts);
      if (lastAttempt) {
        if (lastAttempt.result === '<') {
          min = lastAttempt.guessNumber;
        }
        if (lastAttempt.result === '>') {
          max = lastAttempt.guessNumber;
        }
        if (lastAttempt.result === '=') {
          break;
        }
      }

      const currentGuess = max - Math.round((max - min) / 2);

      guessAttempts = guessAttempts.concat({
        guessNumber: currentGuess,
        result: this.directionFromGuess(currentGuess, targetNumber)
      });

      this.setState({
        guessAttempts
      });
    }

    this.setState({
      guessCount: guessAttempts.length,
      finished: true
    });
  }

  public directionFromGuess(guess: number, targetNumber: number): string {
    if (guess === targetNumber) {
      return '=';
    }
    if (guess > targetNumber) {
      return '>';
    }
    if (guess < targetNumber) {
      return '<';
    }

    return '>';
  }

  public nameForResult(result: string): string {
    if (result === '=') {
      return 'equal!';
    }
    if (result === '>') {
      return 'lower';
    }
    if (result === '<') {
      return 'higher';
    }

    return 'Unknown';
  }

  public render() {
    const { input, inputError, targetNumber, guessAttempts, finished, guessCount, guessLimit } = this.state;
    return (
      <PageFlow>
        <Spacing />
        <img src={thinkingImage} alt="question mark" style={{ width: '320px', height: '226px' }} />
        <Spacing />
        {targetNumber === undefined ? (
          <React.Fragment>
            <p>Think of a number between 1 and 100 and I will guess it within 10 attempts.</p>
            <Row style={{ width: '500px' }}>
              <TextField
                label="Enter a number between 1 and 100"
                value={input}
                onChange={this.handleChange}
                inputRef={this.handleInputRef}
                onKeyDown={this.onKeyDown}
                error={inputError !== undefined}
                helperText={inputError}
                fullWidth
              />
              <Spacing />
              <Button variant="contained" onClick={() => this.submitAnswer()}>
                Submit to Expert AI
              </Button>
            </Row>
          </React.Fragment>
        ) : null}
        {targetNumber !== undefined ? (
          <React.Fragment>
            {!finished ? (
              <Row>
                Attempting to guess number {targetNumber}
                <Spacing />
                <Button variant="contained" onClick={() => this.restart()}>
                  Stop
                </Button>
              </Row>
            ) : null}
            <Spacing />
            <Column>
              {guessAttempts.map((guessAttempt, i) => {
                return (
                  <div key={`${guessAttempt.guessNumber}.${i}`}>
                    Guessed {guessAttempt.guessNumber} it must be {this.nameForResult(guessAttempt.result)}
                  </div>
                );
              })}
            </Column>
          </React.Fragment>
        ) : null}
        {finished ? (
          <React.Fragment>
            <div>{guessCount < guessLimit ? `I solved it in ${guessCount} attempts` : 'I failed to solve it'}</div>
            <Spacing />
            <Button variant="contained" onClick={() => this.restart()}>
              Again?
            </Button>
          </React.Fragment>
        ) : null}
      </PageFlow>
    );
  }
}
