import React, { useState } from "react";
import last from "lodash/last";
import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import { PageLayout } from "../../components/PageLayout";
import { Stack } from "../../components/Stack";
import thinkingImage from "./thinkingAI.png";

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

const initState = {
  input: "",
  targetNumber: undefined,
  inputError: undefined,
  guessCount: 0,
  guessLimit: 10,
  guessAttempts: [],
  finished: false
};

function directionFromGuess(guess: number, targetNumber: number): string {
  if (guess === targetNumber) {
    return "=";
  }
  if (guess > targetNumber) {
    return ">";
  }
  if (guess < targetNumber) {
    return "<";
  }

  return ">";
}

function nameForResult(result: string): string {
  if (result === "=") {
    return "equal!";
  }
  if (result === ">") {
    return "lower";
  }
  if (result === "<") {
    return "higher";
  }

  return "Unknown";
}

function calculateAnswer(targetNumber: number, maxAttempts: number) {
  let max = 101;
  let min = 0;
  let guessAttempts: GuessAttempt[] = [];
  while (guessAttempts.length < maxAttempts) {
    const lastAttempt = last(guessAttempts);
    if (lastAttempt) {
      if (lastAttempt.result === "<") {
        min = lastAttempt.guessNumber;
      }
      if (lastAttempt.result === ">") {
        max = lastAttempt.guessNumber;
      }
      if (lastAttempt.result === "=") {
        break;
      }
    }

    const currentGuess = max - Math.round((max - min) / 2);

    guessAttempts = guessAttempts.concat({
      guessNumber: currentGuess,
      result: directionFromGuess(currentGuess, targetNumber)
    });
  }

  return {
    guessAttempts,
    guessCount: guessAttempts.length,
    finished: true
  };
}

export default function GuesserAI() {
  const [gameState, setGameState] = useState<State>(initState);
  const {
    input,
    inputError,
    targetNumber,
    guessAttempts,
    finished,
    guessCount,
    guessLimit
  } = gameState;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGameState({ ...gameState, input: event.target.value });
  };

  const restart = () => {
    setGameState(initState);
  };

  const submitAnswer = () => {
    const inputNumber = parseInt(input, 10);
    if (
      !Number.isInteger(inputNumber) ||
      inputNumber < 1 ||
      inputNumber > 100
    ) {
      return setGameState({
        ...gameState,
        inputError: "Invalid number"
      });
    }
    const result = calculateAnswer(inputNumber, guessLimit);
    setGameState({
      ...gameState,
      targetNumber: inputNumber,
      inputError: undefined,
      ...result
    });
  };

  return (
    <PageLayout title="Guess the number AI">
      <Stack>
        <img
          src={thinkingImage}
          alt="question mark"
          style={{ width: "320px", height: "226px" }}
        />
        {targetNumber === undefined ? (
          <Stack>
            <Typography>
              Think of a number between 1 and 100 and I will guess it within 10
              attempts.
            </Typography>
            <Box width={500}>
              <TextField
                label="Enter a number between 1 and 100"
                value={input}
                onChange={handleChange}
                error={inputError !== undefined}
                helperText={inputError}
                fullWidth
              />
            </Box>
            <Button variant="contained" onClick={() => submitAnswer()}>
              Submit to AI
            </Button>
          </Stack>
        ) : null}
        {targetNumber !== undefined ? (
          <React.Fragment>
            {!finished ? (
              <div>
                <span>Attempting to guess number {targetNumber}</span>
                <Button variant="contained" onClick={() => restart()}>
                  Stop
                </Button>
              </div>
            ) : null}
            {guessAttempts.map((guessAttempt, i) => {
              return (
                <Typography key={`${guessAttempt.guessNumber}.${i}`}>
                  Guessed {guessAttempt.guessNumber} it must be{" "}
                  {nameForResult(guessAttempt.result)}
                </Typography>
              );
            })}
          </React.Fragment>
        ) : null}
        {finished ? (
          <Stack>
            <Typography>
              {guessCount < guessLimit
                ? `I solved it in ${guessCount} attempts`
                : "I failed to solve it"}
            </Typography>
            <Button variant="contained" onClick={() => restart()}>
              Again?
            </Button>
          </Stack>
        ) : null}
      </Stack>
    </PageLayout>
  );
}
