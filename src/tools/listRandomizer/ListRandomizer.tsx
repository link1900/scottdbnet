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
import MoodIcon from  "@material-ui/icons/Mood";
import RotateRightIcon from "@material-ui/icons/RotateRight";
import { useLocation } from "react-router-dom";

import { SitePage } from "../../components/SitePage";
import { makeValidJsonRequest } from "../../util/apiHelper";
import {
  base64DecodeString,
  base64EncodeString
} from "../../util/stringHelper";

const defaultItems = ["Item1", "Item2", "Item3", "Item4"];

function getDefaultList(urlSearch: string): string[] {
  const listParameter = new URLSearchParams(urlSearch).get("list");
  if (!listParameter) {
    return defaultItems;
  }
  try {
    const decodedListString = base64DecodeString(listParameter);
    return decodedListString.split("\n");
  } catch {
    return defaultItems;
  }
}

export function ListRandomizer() {
  const { search } = useLocation();
  const startingListItems = getDefaultList(search);
  const [value, setValue] = React.useState<{
    listValue: string[];
    textValue: string;
  }>({
    listValue: startingListItems,
    textValue: startingListItems.join("\n")
  });

  const [toastOpen, setToastOpen] = React.useState(false);
  const [joke, setJoke] = useState<string>("");

  const handleTextChange = (event: any) => {
    const textValue = event.target.value;
    const listValue = textValue
      .split("\n")
      .filter((i: string) => i.trim().length > 0);
    setValue({
      textValue,
      listValue
    });
  };

  const handleShuffle = () => {
    const listValue = shuffle(value.listValue);
    const textValue = listValue.join("\n");
    setValue({
      textValue,
      listValue
    });
  };

  const handleSort = () => {
    const listValue = value.listValue.sort();
    const textValue = listValue.join("\n");
    setValue({
      textValue,
      listValue
    });
  };

  const handleRotate = () => {
    const item = value.listValue.shift();
    if (item) {
      value.listValue.push(item);
      const listValue = value.listValue;
      const textValue = listValue.join("\n");
      setValue({
        textValue,
        listValue
      });
    }
  }

  const handleShare = async () => {
    const url = new URL(window.location.toString());
    const params = new URLSearchParams();
    params.set("list", base64EncodeString(value.textValue));
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
    <SitePage>
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
      <Grid container justifyContent="center" spacing={2}>
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
                    startIcon={<RotateRightIcon />}
                    onClick={() => handleRotate()}
                  >
                    Rotate
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
              </Grid>
            </Grid>
            <Grid item>
              <TextField
                id="simple-item-input"
                label="Items"
                multiline
                fullWidth
                minRows={20}
                value={value.textValue}
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
    </SitePage>
  );
}
