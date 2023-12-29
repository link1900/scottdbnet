import React, { useState } from "react";
import { Button, Typography } from "@material-ui/core";
import SettingIcon from "@material-ui/icons/Settings";
import { DataZone } from "../../components/DataZone";
import { makeValidJsonRequest } from "../../util/apiHelper";
import { splitLines } from "../../util/stringHelper";
import { PageLayout } from "../components/PageLayout";
import { Section } from "../components/Section";
import { Stack } from "../components/Stack";
import { useStore } from "../components/useStore";
import RandomJokeOptions from "./RandomJokeOptions";

export type JokeOption = {
  name: string;
  label: string;
  enabled: boolean;
};

export type RandomJokeStore = {
  options: JokeOption[];
};

const jokeOptions = [
  {
    name: "nsfw",
    label: "NSFW",
    enabled: false
  },
  {
    name: "dad",
    label: "Dad",
    enabled: false
  },
  {
    name: "chuck",
    label: "Chuck Norris",
    enabled: false
  }
];

const defaultRandomJokeStore: RandomJokeStore = {
  options: jokeOptions
};

const isOptionEnabled = (store: RandomJokeStore, name: string): boolean => {
  const found = store.options.find((o) => o.name === name);
  return found?.enabled ?? false;
};

export default function RandomJoke() {
  const [loading, setLoading] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [error, setError] = useState<Error | unknown>();
  const [joke, setJoke] = useState<string>("");
  const [store, setStore] = useStore<RandomJokeStore>({
    localStoreKey: "randomJoke.store",
    defaultStore: defaultRandomJokeStore
  });

  const generateJoke = async () => {
    if (isOptionEnabled(store, "dad")) {
      await generateHazDadJoke();
    } else if (isOptionEnabled(store, "chuck")) {
      await generateJokeChuck();
    } else {
      await generateJokeDev();
    }
  };

  const generateJokeDev = async () => {
    try {
      setError(undefined);
      setJoke("");
      setLoading(true);
      const blacklistFlags = isOptionEnabled(store, "nsfw")
        ? ""
        : [
            "nsfw",
            "religious",
            "political",
            "racist",
            "sexist",
            "explicit"
          ].join(",");
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

  const openOptions = async () => {
    setShowOptions(true);
  };

  const closeOptions = async () => {
    setShowOptions(false);
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

  return (
    <PageLayout title="Random Joke Generator" md={10} lg={6}>
      <RandomJokeOptions
        open={showOptions}
        onClose={closeOptions}
        store={store}
        setStore={setStore}
      />
      <Stack spacing={4}>
        <Stack direction="row">
          <Button
            variant="contained"
            color="primary"
            disabled={loading}
            onClick={() => generateJoke()}
          >
            Generate Joke
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<SettingIcon />}
            onClick={() => openOptions()}
          >
            Options
          </Button>
        </Stack>
        {joke.length > 0 || loading || error ? (
          <Section title="Joke">
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
