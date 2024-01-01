import React, { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import { PageLayout } from "../../components/PageLayout";
import { Row } from "../../components/Row";
import { Stack } from "../../components/Stack";
import thinkingImage from "./thinking.jpg";
import { randomInteger } from "../gameEngines/sdbCanvas2";

interface State {
  guessCount: number;
  guessLimit: number;
  currentGuess: string;
  finished: boolean;
  theNumber: number;
  history: string;
}

const initState = {
  guessCount: 0,
  guessLimit: 10,
  currentGuess: "",
  finished: false,
  theNumber: randomInteger(1, 100),
  history: "You have 10 guesses left"
};

export default function Guesser() {
  const [gameState, setGameState] = useState<State>(initState);
  const { guessCount, guessLimit, currentGuess, finished, theNumber, history } =
    gameState;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGameState({ ...gameState, currentGuess: event.target.value });
  };

  const restart = () => {
    setGameState(initState);
  };

  const submitGuess = () => {
    const textGuess = currentGuess;
    const answer = theNumber;
    try {
      const guess = parseInt(textGuess, 10);
      if (guess === answer) {
        setGameState({
          ...gameState,
          currentGuess: "",
          history: `Your guess of ${guess} was correct. You win!`,
          guessCount: guessCount + 1,
          finished: true
        });
      } else if (guess < answer) {
        const newGuessCount = guessCount + 1;
        const guessLeft = guessLimit - newGuessCount;
        setGameState({
          ...gameState,
          currentGuess: "",
          history: `Your guess of ${guess} is wrong. Try higher. You have ${guessLeft} guesses left.`,
          guessCount: newGuessCount
        });
      } else if (guess > answer) {
        const newGuessCount = guessCount + 1;
        const guessLeft = guessLimit - newGuessCount;
        setGameState({
          ...gameState,
          currentGuess: "",
          history: `Your guess of ${guess} is wrong. Try lower. You have ${guessLeft} guesses left.`,
          guessCount: newGuessCount
        });
      } else {
        setGameState({
          ...gameState,
          currentGuess: "",
          history: "You entered an invalid number. Try again."
        });
      }
    } catch (e) {
      setGameState({
        ...gameState,
        currentGuess: "",
        history: "You entered an invalid number. Try again."
      });
    }

    if (guessCount + 1 >= guessLimit) {
      setGameState({
        ...gameState,
        currentGuess: "",
        history: "No more guesses left. You lost.",
        finished: true
      });
    }
  };

  return (
    <PageLayout title="Guess the number">
      <Stack align="center">
        <img
          src={thinkingImage}
          alt="question mark"
          style={{ width: "320px", height: "226px" }}
        />
        <Typography>Can you guess the number I am thinking of?</Typography>
        {!finished ? (
          <Box width={500}>
            <TextField
              label="Enter a number between 1 and 100"
              value={currentGuess}
              onChange={handleChange}
              fullWidth
            />
          </Box>
        ) : null}
        <Typography>{history}</Typography>
        <Row spacing={2}>
          {!finished ? (
            <Button variant="contained" onClick={() => submitGuess()}>
              Submit
            </Button>
          ) : null}
          <Button variant="contained" onClick={() => restart()}>
            {!finished ? "Restart" : "Again?"}
          </Button>
        </Row>
      </Stack>
    </PageLayout>
  );
}
