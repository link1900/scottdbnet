import React, { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import thinkingImage from "./thinking.jpg";
import { randomInteger } from "../gameEngine";
import { SitePage } from "../../components/SitePage";

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

export function Guesser() {
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
    <SitePage>
      <Grid container spacing={3} direction="column" alignItems="center">
        <Grid item>
          <img
            src={thinkingImage}
            alt="question mark"
            style={{ width: "320px", height: "226px" }}
          />
        </Grid>
        <Grid item>
          <Typography>Can you guess the number I am thinking of?</Typography>
        </Grid>
        {!finished ? (
          <Grid item xs={12}>
            <Box width={500}>
              <TextField
                label="Enter a number between 1 and 100"
                value={currentGuess}
                onChange={handleChange}
                fullWidth
              />
            </Box>
          </Grid>
        ) : null}
        <Grid item xs={12}>
          <Typography>{history}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="row" spacing={2}>
            {!finished ? (
              <Grid item>
                <Button variant="contained" onClick={() => submitGuess()}>
                  Submit
                </Button>
              </Grid>
            ) : null}
            <Grid item>
              <Button variant="contained" onClick={() => restart()}>
                {!finished ? "Restart" : "Again?"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </SitePage>
  );
}
