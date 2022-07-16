import React, { useState } from "react";
import { shuffle } from "lodash";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Switch,
  TextField,
  Typography
} from "@material-ui/core";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import SortIcon from "@material-ui/icons/Sort";
import ShareIcon from "@material-ui/icons/Share";
import CloseIcon from "@material-ui/icons/Close";
import MoodIcon from "@material-ui/icons/Mood";
import ClearIcon from "@material-ui/icons/Clear";
import ShowChartIcon from "@material-ui/icons/ShowChart";
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
  advancedMode: boolean;
  simulationAmount: number;
}

export interface SimulationResult {
  currentSimulations: number;
  totalSimulations: number;
  expectedAmount: number;
  items: Array<{ name: string; amount: number }>;
}

const defaultListItems = ["Item1", "Item2", "Item3", "Item4"];
const defaultStore: ListRandomizerStore = {
  mode: "text",
  listValue: defaultListItems,
  textValue: listItemsToString(defaultListItems),
  advancedMode: false,
  simulationAmount: 10000
};

function listItemsToString(listItems: string[]): string {
  return listItems.join("\n");
}

function stringToListItems(stringValue: string): string[] {
  return stringValue.split("\n").filter((i: string) => i.trim().length > 0);
}

function getUrlStore(
  urlSearch: string
): Partial<ListRandomizerStore> | undefined {
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

function flattenStores(
  stores: Array<Partial<ListRandomizerStore> | undefined>
): ListRandomizerStore {
  return stores.reduce<ListRandomizerStore>((totalStore, currentStore) => {
    return {
      ...totalStore,
      ...currentStore
    };
  }, defaultStore);
}

function getTotalFirstChartOptions(results: SimulationResult): any {
  const categories = results.items.map((item) => item.name);
  const data = results.items.map((item) => item.amount);
  return {
    title: {
      text: "Who went first"
    },
    xAxis: {
      categories,
      title: {
        text: null
      }
    },
    yAxis: {
      title: {
        text: "Firsts"
      }
    },
    legend: {
      enabled: false
    },
    series: [
      {
        type: "bar",
        name: "Total firsts",
        data
      }
    ],
    credits: {
      enabled: false
    }
  };
}

function getDiffChartOptions(results: SimulationResult): any {
  const expected = results.expectedAmount;
  const categories = results.items.map((item) => item.name);
  const dataPos = results.items.map((item) =>
    Math.min(expected - item.amount, 0)
  );
  const dataNeg = results.items.map((item) =>
    Math.max(expected - item.amount, 0)
  );
  return {
    chart: {
      type: "bar"
    },
    title: {
      text: "Distribution"
    },
    xAxis: [
      {
        categories,
        reversed: false,
        labels: {
          step: 1
        }
      },
      {
        categories,
        opposite: true,
        reversed: true,
        linkedTo: 0,
        labels: {
          step: 1
        }
      }
    ],
    yAxis: {
      title: {
        text: null
      }
    },
    plotOptions: {
      series: {
        stacking: "normal"
      }
    },
    legend: {
      enabled: false
    },
    series: [
      {
        name: "Difference",
        data: dataNeg
      },
      {
        name: "Difference",
        data: dataPos
      }
    ],
    credits: {
      enabled: false
    }
  };
}

export function ListRandomizer() {
  const { search } = useLocation();
  const urlStore = getUrlStore(search);
  const [localStore, setLocalStore, removeLocalStore] = useLocalStorage<
    Partial<ListRandomizerStore>
  >("listRandomizer.store");
  const [store, setStore] = React.useState<ListRandomizerStore>(
    flattenStores([urlStore, localStore])
  );
  const [toastOpen, setToastOpen] = React.useState(false);
  const [joke, setJoke] = useState<string>("");
  const [chartOptions, setChartOptions] = useState(undefined);
  const [chartDiffOptions, setChartDiffOptions] = useState(undefined);

  const updateStore = (updatedStore: Partial<ListRandomizerStore>) => {
    const toChange = {
      ...store,
      ...updatedStore
    };
    setLocalStore(toChange);
    setStore(toChange);
  };

  const updateList = (updatedList: string[]) => {
    updateStore({
      textValue: listItemsToString(updatedList),
      listValue: updatedList
    });
  };

  const updateText = (updateText: string) => {
    updateStore({
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

  const handleSimulationAmountChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const selectedValue = event.target.value;
    updateStore({ simulationAmount: selectedValue as number });
  };

  const runSimulation = () => {
    if (store.listValue.length === 0) {
      return false;
    }
    const results: SimulationResult = {
      currentSimulations: 0,
      totalSimulations: store.simulationAmount,
      expectedAmount: Math.round(
        store.simulationAmount / store.listValue.length
      ),
      items: store.listValue.sort().map((item) => {
        return {
          name: item,
          amount: 0
        };
      })
    };
    setChartOptions(getTotalFirstChartOptions(results));
    let slots = results.items.map((item, index) => index);
    for (let i = 0; i < results.totalSimulations; i++) {
      slots = shuffle(slots);
      results.items[slots[0]].amount++;
      results.currentSimulations++;
    }

    setChartOptions(getTotalFirstChartOptions(results));
    setChartDiffOptions(getDiffChartOptions(results));
    return true;
  };

  const handleAdvancedModeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateStore({ advancedMode: event.target.checked });
  };

  return (
    <React.Fragment>
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
      <Grid container justifyContent="center" spacing={4}>
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
                <Grid item>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={store.advancedMode}
                        onChange={handleAdvancedModeChange}
                        name="advancedModeSwitch"
                        color="primary"
                      />
                    }
                    label="Advanced"
                  />
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
        {store.advancedMode ? (
          <React.Fragment>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Grid container direction={"column"} spacing={2}>
                <Grid item>
                  <Grid container direction="row" spacing={2}>
                    <Grid item>
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        startIcon={<ShowChartIcon />}
                        onClick={() => runSimulation()}
                      >
                        Run simulation
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <FormControl>
                    <InputLabel id="format-select-outlined-label">
                      Amount
                    </InputLabel>
                    <Select
                      labelId="sim-amount-select-outlined-label"
                      id="sim-amount-select-outlined"
                      value={store.simulationAmount}
                      onChange={handleSimulationAmountChange}
                      label="Amount"
                    >
                      <MenuItem value={100}>100</MenuItem>
                      <MenuItem value={1000}>1k</MenuItem>
                      <MenuItem value={10000}>10k</MenuItem>
                      <MenuItem value={100000}>100k</MenuItem>
                      <MenuItem value={1000000}>1m</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {chartOptions ? (
                  <Grid item>
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={chartOptions}
                    />
                  </Grid>
                ) : null}
                {chartDiffOptions ? (
                  <Grid item>
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={chartDiffOptions}
                    />
                  </Grid>
                ) : null}
              </Grid>
            </Grid>
          </React.Fragment>
        ) : null}
      </Grid>
    </React.Fragment>
  );
}
