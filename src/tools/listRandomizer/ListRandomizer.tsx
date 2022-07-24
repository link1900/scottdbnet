import React, { useState } from "react";
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
  Slider,
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
import { useLocation, useNavigate } from "react-router-dom";
import { useLocalStorage } from "react-use";
import { copyArray } from "../../util/arrayHelper";
import { randomBoolean, shuffle } from "../../util/randomHelper";
import {
  base64DecodeString,
  base64EncodeString
} from "../../util/stringHelper";

export interface ListItem {
  value: string;
  amount: number;
  bias: number;
}

export interface ListRandomizerStore {
  mode: "text" | "checklist";
  list: ListItem[];
  textValue: string;
  showSimulator: boolean;
  showBias: boolean;
  simulationAmount: number;
}

export interface SimulationResult {
  currentSimulations: number;
  totalSimulations: number;
  expectedAmount: number;
  items: ListItem[];
}

const defaultListItems = [
  { value: "Item1", bias: 0, amount: 0 },
  { value: "Item2", bias: 0, amount: 0 },
  { value: "Item3", bias: 0, amount: 0 },
  { value: "Item4", bias: 0, amount: 0 }
];
const defaultStore: ListRandomizerStore = {
  mode: "text",
  list: defaultListItems,
  textValue: listItemsToString(defaultListItems),
  showSimulator: false,
  showBias: false,
  simulationAmount: 10000
};

function listItemsToString(listItems: ListItem[]): string {
  return listItems.map((i) => i.value).join("\n");
}

function stringToListItems(stringValue: string): ListItem[] {
  return stringValue
    .split("\n")
    .filter((i: string) => i.trim().length > 0)
    .map((i) => {
      return {
        value: i,
        bias: 0,
        amount: 0
      };
    });
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
  const categories = results.items.map((item) => item.value);
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
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true
        }
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
  const categories = results.items.map((item) => item.value);
  const dataPos = results.items.map((item) => item.amount - expected);
  return {
    chart: {
      type: "bar"
    },
    title: {
      text: "Distance from average"
    },
    xAxis: [
      {
        categories,
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
      bar: {
        dataLabels: {
          enabled: true
        }
      }
    },
    legend: {
      enabled: false
    },
    series: [
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

function listItemSort(a: ListItem, b: ListItem): number {
  return a.value.localeCompare(b.value);
}

function shuffleWithBias(list: ListItem[]) {
  const shuffledItems = shuffle(list);
  for (let i = 0; i < shuffledItems.length; i++) {
    const checkItem = shuffledItems[i];
    if (checkItem.bias > 0) {
      if (randomBoolean({ likelihood: checkItem.bias })) {
        const moved = shuffledItems[0];
        shuffledItems[0] = checkItem;
        shuffledItems[i] = moved;
      }
    }
  }
  return shuffledItems;
}

function valueLabelFormat(value: number): string {
  return `${value}%`;
}

function sortedItemList(itemList: ListItem[]): ListItem[] {
  return copyArray(itemList).sort(listItemSort);
}

export function ListRandomizer() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const urlStore = getUrlStore(search);
  const [localStore, setLocalStore, removeLocalStore] = useLocalStorage<
    Partial<ListRandomizerStore>
  >("listRandomizer.store");
  const [store, setStore] = React.useState<ListRandomizerStore>(
    flattenStores([urlStore, localStore])
  );
  const [toastOpen, setToastOpen] = React.useState(false);
  const [chartOptions, setChartOptions] = useState(undefined);
  const [chartDiffOptions, setChartDiffOptions] = useState(undefined);
  const [chartAverage, setChartAverage] = useState<number | undefined>(
    undefined
  );

  const updateStore = (updatedStore: Partial<ListRandomizerStore>) => {
    const toChange = {
      ...store,
      ...updatedStore
    };
    setLocalStore(toChange);
    setStore(toChange);
  };

  const updateList = (updatedList: ListItem[]) => {
    updateStore({
      textValue: listItemsToString(updatedList),
      list: updatedList
    });
  };

  const updateText = (updateText: string) => {
    const list = stringToListItems(updateText);
    updateStore({
      textValue: updateText,
      list
    });
  };

  const handleTextChange = (event: any) => {
    const textValue = event.target.value;
    updateText(textValue);
  };

  const handleShuffle = () => {
    updateList(shuffleWithBias(store.list));
  };

  const handleSort = () => {
    updateList(store.list.sort(listItemSort));
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
    navigate("../randomJoke");
  };

  const handleSimulationAmountChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const selectedValue = event.target.value;
    updateStore({ simulationAmount: selectedValue as number });
  };

  const runSimulation = () => {
    if (store.list.length === 0) {
      return false;
    }
    const results: SimulationResult = {
      currentSimulations: 0,
      totalSimulations: store.simulationAmount,
      expectedAmount: Math.round(store.simulationAmount / store.list.length),
      items: store.list.sort(listItemSort).map((item) => {
        return {
          value: item.value,
          bias: item.bias,
          amount: 0
        };
      })
    };
    setChartOptions(getTotalFirstChartOptions(results));
    for (let i = 0; i < results.totalSimulations; i++) {
      results.items = shuffleWithBias(results.items);
      results.items[0].amount++;
      results.currentSimulations++;
    }
    results.items.sort(listItemSort);
    setChartAverage(results.expectedAmount);
    setChartOptions(getTotalFirstChartOptions(results));
    setChartDiffOptions(getDiffChartOptions(results));
    return true;
  };

  const handleShowSimulatorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateStore({ showSimulator: event.target.checked });
  };

  const handleShowBiasChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateStore({ showBias: event.target.checked });
  };

  const handleBiasChange = (value: string, amount: number) => {
    const list = copyArray(store.list);
    const foundItem = list.find((i) => i.value === value);
    if (foundItem) {
      foundItem.bias = amount;
      updateStore({
        list
      });
    }
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
      <Grid container justifyContent="center" spacing={6}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Grid container direction={"column"} spacing={2}>
            <Grid item>
              <Typography variant="h5" component="h2">
                List Randomizer
              </Typography>
            </Grid>
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
                        checked={store.showSimulator}
                        onChange={handleShowSimulatorChange}
                        name="showSimulatorSwitch"
                        color="primary"
                      />
                    }
                    label="Simulator"
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={store.showBias}
                        onChange={handleShowBiasChange}
                        name="showBiasSwitch"
                        color="primary"
                      />
                    }
                    label="Bias"
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
          </Grid>
        </Grid>
        {store.showSimulator ? (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Grid container direction={"column"} spacing={2}>
              <Grid item>
                <Typography variant="h5" component="h2">
                  Simulator
                </Typography>
              </Grid>
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
                      Run
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
              {chartAverage ? (
                <Grid item>
                  <Typography>Expected average: {chartAverage}</Typography>
                </Grid>
              ) : null}
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
        ) : null}
        {store.showBias ? (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Grid container direction={"column"} spacing={2}>
              <Grid item>
                <Typography variant="h5" component="h2">
                  Bias
                </Typography>
              </Grid>
              {sortedItemList(store.list).map((item) => {
                return (
                  <Grid key={item.value} item xs>
                    <Typography gutterBottom>{item.value}</Typography>
                    <Slider
                      valueLabelDisplay="auto"
                      value={item.bias}
                      valueLabelFormat={valueLabelFormat}
                      onChange={(event: any, newValue: number | number[]) =>
                        handleBiasChange(item.value, newValue as number)
                      }
                      step={10}
                      marks
                      min={0}
                      max={100}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        ) : null}
      </Grid>
    </React.Fragment>
  );
}
