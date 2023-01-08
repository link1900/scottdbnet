import React, { useState } from "react";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
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
import LargeTextArea from "../components/LargeTextArea";
import LoadingDialog from "../components/LoadingDialog";

enum EncodingFormat {
  BASE64 = "BASE64"
}

export function encodingFormatLabel(format: EncodingFormat): string {
  switch (format) {
    case EncodingFormat.BASE64:
      return "Base64";
  }

  return "";
}

export default function Encoder() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [encoding, setEncoding] = useState<EncodingFormat>(
    EncodingFormat.BASE64
  );

  const handleEncoding = async () => {
    setLoading(true);
    try {
      const result = btoa(input);
      setOutput(result);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
      setOutput("Failed to encode input.");
    }
  };

  const handleDecode = async () => {
    setLoading(true);
    try {
      const result = atob(output);
      setInput(result);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
      setInput("Failed to decode output.");
    }
  };

  const handleFormatChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedValue = event.target.value;
    setEncoding(selectedValue as EncodingFormat);
  };

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12} sm={8}>
        <Grid container direction={"column"} spacing={2}>
          <Grid data-id="title-section" item>
            <Typography variant="h4" component="h1">
              Encoder
            </Typography>
          </Grid>
          <Grid
            data-id="input-section"
            item
            container
            direction={"column"}
            spacing={1}
          >
            <Grid item>
              <Typography variant="h6">Enter data</Typography>
            </Grid>
            <Grid item>
              <LargeTextArea
                id="raw-text-input"
                value={input}
                onChange={setInput}
                placeholder={"Enter or paste text here"}
                showSample
              />
            </Grid>
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
                  <InputLabel id="format-select-outlined-label">
                    Format
                  </InputLabel>
                  <Select
                    labelId="format-select-outlined-label"
                    id="format-select-outlined"
                    value={encoding}
                    onChange={handleFormatChange}
                    label="Format"
                  >
                    <MenuItem value={EncodingFormat.BASE64}>
                      {encodingFormatLabel(EncodingFormat.BASE64)}
                    </MenuItem>
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
                    onClick={() => handleEncoding()}
                  >
                    Encode
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<ArrowUpwardIcon />}
                    onClick={() => handleDecode()}
                  >
                    Decode
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <LargeTextArea
                id="encoder-output"
                value={output}
                onChange={setOutput}
                placeholder={"Output results"}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <LoadingDialog open={loading} title={"Encoding..."} />
    </Grid>
  );
}
