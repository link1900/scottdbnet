import { shuffle } from "lodash";
import React, { useState } from "react";
import {
  Button,
  Grid,
  IconButton,
  Snackbar,
  TextField,
  Typography
} from "@material-ui/core";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import SortIcon from "@material-ui/icons/Sort";
import ShareIcon from "@material-ui/icons/Share";
import CloseIcon from "@material-ui/icons/Close";
import MoodIcon from "@material-ui/icons/Mood";
import ClearIcon from "@material-ui/icons/Clear";
import { useLocation } from "react-router-dom";
import { useLocalStorage } from "react-use";
import { makeValidJsonRequest } from "../../util/apiHelper";
import {
  base64DecodeString,
  base64EncodeString
} from "../../util/stringHelper";

export interface ListRandomizerStore {
  mode: "text" | "checklist";
  listValue: string[];
  textValue: string;
}

const defaultListItems = ["Item1", "Item2", "Item3", "Item4"];
const defaultStore: ListRandomizerStore = {
  mode: "text",
  listValue: defaultListItems,
  textValue: listItemsToString(defaultListItems)
};

function listItemsToString(listItems: string[]): string {
  return listItems.join("\n");
}

function stringToListItems(stringValue: string): string[] {
  return stringValue.split("\n").filter((i: string) => i.trim().length > 0);
}

function getUrlStore(urlSearch: string): ListRandomizerStore | undefined {
  const storeParameter = new URLSearchParams(urlSearch).get("store");
  if (!storeParameter) {
    return undefined;
  }
  try {
    return JSON.parse(base64DecodeString(storeParameter));
  } catch {
    return undefined;
  }
}

export function ListRandomizer() {
  const { search } = useLocation();
  const urlStore = getUrlStore(search);
  const [localStore, setLocalStore, removeLocalStore] =
    useLocalStorage<ListRandomizerStore>("listRandomizer.store");
  const [store, setStore] = React.useState<ListRandomizerStore>(
    urlStore ?? localStore ?? defaultStore
  );
  const [toastOpen, setToastOpen] = React.useState(false);
  const [joke, setJoke] = useState<string>("");

  const updateStore = (updatedStore: ListRandomizerStore) => {
    setLocalStore(updatedStore);
    setStore(updatedStore);
  };

  const updateList = (updatedList: string[]) => {
    updateStore({
      ...store,
      textValue: listItemsToString(updatedList),
      listValue: updatedList
    });
  };

  const updateText = (updateText: string) => {
    updateStore({
      ...store,
      textValue: updateText,
      listValue: stringToListItems(updateText)
    });
  };

  const handleTextChange = (event: any) => {
    const textValue = event.target.value;
    updateText(textValue);
  };

  const handleShuffle = () => {
    updateList(shuffle(store.listValue));
  };

  const handleSort = () => {
    updateList(store.listValue.sort());
  };

  const handleShare = async () => {
    const url = new URL(window.location.toString());
    const params = new URLSearchParams();
    params.set("store", base64EncodeString(JSON.stringify(store)));
    url.search = params.toString();
    await navigator.clipboard.writeText(url.toString());
    setToastOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setToastOpen(false);
  };

  const handleReset = () => {
    updateStore(defaultStore);
    removeLocalStore();
  };

  const generateJoke = async () => {
    try {
      const data = await makeValidJsonRequest<{ joke: string }>({
        url: "https://icanhazdadjoke.com/"
      });
      setJoke(data.joke);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={toastOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Link copied to clipboard"
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Grid container direction={"column"} spacing={2}>
          <Grid item>
            <Grid container direction="row" spacing={1}>
              <Grid item>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  startIcon={<ShuffleIcon />}
                  onClick={() => handleShuffle()}
                >
                  Shuffle
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  startIcon={<SortIcon />}
                  onClick={() => handleSort()}
                >
                  Sort
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  startIcon={<ShareIcon />}
                  onClick={() => handleShare()}
                >
                  Share
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  startIcon={<MoodIcon />}
                  onClick={() => generateJoke()}
                >
                  Joke
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  startIcon={<ClearIcon />}
                  onClick={() => handleReset()}
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <TextField
              id="simple-item-input"
              label="Items"
              multiline
              fullWidth
              minRows={20}
              value={store.textValue}
              onChange={handleTextChange}
              variant="outlined"
            />
          </Grid>
          {joke.length > 0 ? (
            <Grid item>
              <Typography>{joke}</Typography>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    </Grid>
  );
}
