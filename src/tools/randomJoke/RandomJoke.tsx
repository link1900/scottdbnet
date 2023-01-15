import React, { useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Typography
} from "@material-ui/core";
import { DataZone } from "../../components/DataZone";
import { makeValidJsonRequest } from "../../util/apiHelper";
import { splitLines } from "../../util/stringHelper";
import { PageLayout } from "../components/PageLayout";
import { Section } from "../components/Section";
import { Stack } from "../components/Stack";
import { useStore } from "../components/useStore";

export type JokeFlag = {
  name: string;
  enabled: boolean;
};

export type RandomJokeStore = {
  flags: JokeFlag[];
};

const jokeFlags = [
  {
    name: "nsfw",
    enabled: false
  },
  {
    name: "religious",
    enabled: false
  },
  {
    name: "political",
    enabled: false
  },
  {
    name: "racist",
    enabled: false
  },
  {
    name: "sexist",
    enabled: false
  },
  {
    name: "explicit",
    enabled: false
  }
];

const defaultRandomJokeStore: RandomJokeStore = {
  flags: jokeFlags
};

export default function RandomJoke() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | unknown>();
  const [joke, setJoke] = useState<string>("");
  const [store, setStore] = useStore<RandomJokeStore>({
    localStoreKey: "randomJoke.store",
    defaultStore: defaultRandomJokeStore
  });
  const [categoryPos, setCategoryPos] = useState<number>(0);

  const generateHazDadJoke = async () => {
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

  const generateJokeDev = async () => {
    try {
      setError(undefined);
      setJoke("");
      setLoading(true);
      const blacklistFlags = store.flags
        .filter(({ enabled }) => !enabled)
        .map(({ name }) => name)
        .join(",");
      const params = new URLSearchParams({ format: "json", blacklistFlags });
      const url = `https://v2.jokeapi.dev/joke/Any?${params.toString()}`;
      const { type, setup, delivery, joke } = await makeValidJsonRequest<{
        type: "single" | "twopart";
        setup: string;
        delivery: string;
        joke: string;
      }>({
        url
      });
      type === "single" ? setJoke(joke) : setJoke(`${setup}\n${delivery}`);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const generateJokeOne = async () => {
    try {
      setError(undefined);
      setJoke("");
      setLoading(true);
      const category = ["jod", "animal", "blonde", "knock-knock"];
      const params = new URLSearchParams({ category: category[categoryPos] });
      const url = `https://api.jokes.one/jod?${params.toString()}`;
      const data = await makeValidJsonRequest<{
        contents: { jokes: { joke: { text: string } }[] };
      }>({
        url
      });
      setJoke(data.contents.jokes[0].joke.text ?? "");
      setCategoryPos(categoryPos >= category.length - 1 ? 0 : categoryPos + 1);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const generateJokeChuck = async () => {
    try {
      setError(undefined);
      setJoke("");
      setLoading(true);
      const { value } = await makeValidJsonRequest<{
        value: string;
      }>({
        url: "https://api.chucknorris.io/jokes/random"
      });
      setJoke(value);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateFlag = (name: string, enabled: boolean) => {
    const updateFlags = store.flags.map((flag) => {
      if (flag.name === name) {
        flag.enabled = enabled;
        return flag;
      } else {
        return flag;
      }
    });
    setStore({ flags: updateFlags });
  };

  return (
    <PageLayout title="Random Joke Generator" md={10} lg={6}>
      <Stack spacing={4}>
        <Section title="Included types">
          <Stack direction="row">
            {store.flags.map((flag) => {
              return (
                <FormControlLabel
                  key={flag.name}
                  control={
                    <Checkbox
                      checked={flag.enabled}
                      onChange={(e) => updateFlag(flag.name, e.target.checked)}
                      name={flag.name}
                      color="primary"
                    />
                  }
                  label={flag.name}
                />
              );
            })}
          </Stack>
        </Section>
        <Section title="Joke Generators">
          <Stack direction="row">
            <Button
              variant="contained"
              color="primary"
              disabled={loading}
              onClick={() => generateHazDadJoke()}
            >
              icanhazdadjoke
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={loading}
              onClick={() => generateJokeDev()}
            >
              jokeapi.dev
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={loading}
              onClick={() => generateJokeOne()}
            >
              joke.one
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={loading}
              onClick={() => generateJokeChuck()}
            >
              chucknorris.io
            </Button>
          </Stack>
        </Section>
        {joke.length > 0 || loading || error ? (
          <Section title="Result">
            <DataZone loading={loading} error={error} minHeight={50}>
              <Stack>
                {splitLines(joke)
                  .filter((line) => line.length > 0)
                  .map((line) => {
                    return <Typography key={line}>{line}</Typography>;
                  })}
              </Stack>
            </DataZone>
          </Section>
        ) : null}
      </Stack>
    </PageLayout>
  );
}
