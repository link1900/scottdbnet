import React, { useState } from "react";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from "@material-ui/core";
import { SampleGeneratorOptions, SampleType } from "../../util/sampleHelper";
import LargeTextArea from "../components/LargeTextArea";
import { useWorker } from "../workers/useWorker";
import LoadingDialog from "../components/LoadingDialog";
import { createSampleWorker } from "../workers/workerFactories";

export default function SampleGenerator() {
  const [output, setOutput] = useState<string>("");
  const [size, setSize] = React.useState<string>("10240");
  const [type, setType] = React.useState<SampleType>(SampleType.JSON);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { runWorker: generateSample } = useWorker<
    SampleGeneratorOptions,
    string
  >({
    workerFactory: createSampleWorker
  });

  const handleSampleGenerate = async () => {
    const sizeInBytes = parseInt(size, 10);
    setLoading(true);
    try {
      const result = await generateSample({ type, sizeInBytes });
      setLoading(false);
      setOutput(result);
    } catch (e) {
      console.error(e);
      setLoading(false);
      setOutput("Failed to generate sample.");
    }
  };

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12} sm={8}>
        <Grid container direction={"column"} spacing={2}>
          <Grid data-id="title-section" item>
            <Typography variant="h4" component="h1">
              Sample Generator
            </Typography>
          </Grid>
          <Grid
            data-id="options-section"
            item
            container
            direction={"column"}
            spacing={1}
          >
            <Grid item>
              <Typography variant="h6">Select options</Typography>
            </Grid>
            <Grid item container direction="row" spacing={2}>
              <Grid item>
                <FormControl variant="outlined">
                  <InputLabel id="example-type-select-outlined-label">
                    Type
                  </InputLabel>
                  <Select
                    labelId="example-type-select-outlined-label"
                    id="example-type-select-outlined"
                    value={type}
                    onChange={(event) =>
                      setType(event.target.value as SampleType)
                    }
                    label="Example type"
                  >
                    <MenuItem value={SampleType.STRING}>String</MenuItem>
                    <MenuItem value={SampleType.TEXT}>Text</MenuItem>
                    <MenuItem value={SampleType.JSON}>JSON</MenuItem>
                    <MenuItem value={SampleType.CSV}>CSV</MenuItem>
                    <MenuItem value={SampleType.XML}>XML</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl variant="outlined">
                  <InputLabel id="example-size-select-outlined-label">
                    Size
                  </InputLabel>
                  <Select
                    labelId="example-size-select-outlined-label"
                    id="example-size-select-outlined"
                    value={size}
                    onChange={(event) => setSize(event.target.value as string)}
                    label="Example Size"
                  >
                    <MenuItem value="10">10 B</MenuItem>
                    <MenuItem value="100">100 B</MenuItem>
                    <MenuItem value="1024">1 kB</MenuItem>
                    <MenuItem value="10240">10 kB</MenuItem>
                    <MenuItem value="102400">100 kB</MenuItem>
                    <MenuItem value="1048576">1 MB</MenuItem>
                    <MenuItem value="10485760">10 MB</MenuItem>
                    <MenuItem value="104857600">100 MB</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            data-id="output-section"
            container
            item
            direction={"column"}
            spacing={1}
          >
            <Grid item>
              <Typography variant="h6">Generate output</Typography>
            </Grid>
            <Grid data-id="generate-actions" item>
              <Grid container direction="row" alignItems="center" spacing={1}>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ArrowDownwardIcon />}
                    onClick={() => handleSampleGenerate()}
                  >
                    Generate
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <LargeTextArea
                id="sample-output"
                value={output}
                onChange={setOutput}
                placeholder={"Sample results"}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <LoadingDialog open={loading} title={"Generating..."} />
    </Grid>
  );
}
