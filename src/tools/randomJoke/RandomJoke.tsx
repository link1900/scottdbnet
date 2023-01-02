import MoodIcon from "@material-ui/icons/Mood";
import React, { useState } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { DataZone } from "../../components/DataZone";
import { makeValidJsonRequest } from "../../util/apiHelper";

export default function RandomJoke() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | unknown>();
  const [joke, setJoke] = useState<string>("");

  const generateJoke = async () => {
    try {
      setError(undefined);
      setJoke("");
      setLoading(true);
      const data = await makeValidJsonRequest<{ joke: string }>({
        url: "https://icanhazdadjoke.com/"
      });
      setJoke(data.joke);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12} sm={8}>
        <Grid container direction={"column"} alignItems="center" spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              startIcon={<MoodIcon />}
              disabled={loading}
              onClick={() => generateJoke()}
            >
              Joke
            </Button>
          </Grid>
          <Grid item>
            <DataZone loading={loading} error={error} minHeight={50}>
              <Typography>{joke}</Typography>
            </DataZone>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
