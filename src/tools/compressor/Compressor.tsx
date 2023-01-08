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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@material-ui/core";
import {
  CompressionAlgorithm,
  compressionAlgorithmLabel,
  CompressionFormat,
  compressionFormatLabel,
  CompressionResult,
  CompressionOptions,
  CompressorOperations
} from "../../util/compressorHelper";
import { formatBytes } from "../../util/stringHelper";
import LargeTextArea from "../components/LargeTextArea";
import { useWorker } from "../workers/useWorker";
import LoadingDialog from "../components/LoadingDialog";
import { createCompressorWorker } from "../workers/workerFactories";

export interface CompressResult {
  compressAlgorithm: CompressionAlgorithm;
  compressFormat: CompressionFormat;
  time: string;
  originalSize: string;
  compressedSize: string;
  reductionSize: string;
}

export interface CompressorStore {
  compressResult: CompressResult | undefined;
  compressAlgorithm: CompressionAlgorithm;
  compressFormat: CompressionFormat;
  loading: boolean;
}

const initState: CompressorStore = {
  compressResult: undefined,
  compressAlgorithm: CompressionAlgorithm.LZ_STRING,
  compressFormat: CompressionFormat.BASE64,
  loading: false
};

export default function Compressor() {
  const [compressorStore, setCompressorStore] =
    useState<CompressorStore>(initState);
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  const { runWorker: runCompression } = useWorker<
    CompressionOptions,
    CompressionResult
  >({
    workerFactory: createCompressorWorker
  });

  const updateStore = (updatedStore: Partial<CompressorStore>) => {
    setCompressorStore({
      ...compressorStore,
      ...updatedStore
    });
  };

  const handleCompress = async () => {
    updateStore({ loading: true });
    try {
      const result = await runCompression({
        input,
        operation: CompressorOperations.COMPRESS,
        format: compressorStore.compressFormat,
        algorithm: compressorStore.compressAlgorithm
      });
      const compressResult = {
        compressAlgorithm: compressorStore.compressAlgorithm,
        compressFormat: compressorStore.compressFormat,
        time: result.time,
        originalSize: formatBytes(result.originalSize),
        compressedSize: formatBytes(result.compressedSize),
        reductionSize: formatBytes(result.reductionSize)
      };
      updateStore({ loading: false, compressResult });
      setOutput(result.output);
    } catch (e) {
      console.error(e);
      updateStore({ loading: false });
      setInput("Failed to compress input.");
    }
  };

  const handleDecompress = async () => {
    updateStore({ loading: true });
    try {
      const result = await runCompression({
        input: output,
        operation: CompressorOperations.DECOMPRESS,
        format: compressorStore.compressFormat,
        algorithm: compressorStore.compressAlgorithm
      });
      const compressResult = {
        compressAlgorithm: compressorStore.compressAlgorithm,
        compressFormat: compressorStore.compressFormat,
        time: result.time,
        originalSize: formatBytes(result.originalSize),
        compressedSize: formatBytes(result.compressedSize),
        reductionSize: formatBytes(result.reductionSize)
      };
      updateStore({ loading: false, compressResult });
      setInput(result.output);
    } catch (e) {
      console.error(e);
      updateStore({ loading: false });
      setInput("Failed to decompress output.");
    }
  };

  const handleFormatChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedValue = event.target.value;
    updateStore({ compressFormat: selectedValue as CompressionFormat });
  };

  const handleAlgoChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedValue = event.target.value;
    updateStore({ compressAlgorithm: selectedValue as CompressionAlgorithm });
  };

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12} sm={8}>
        <Grid container direction={"column"} spacing={2}>
          <Grid data-id="title-section" item>
            <Typography variant="h4" component="h1">
              Compressor
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
                  <InputLabel id="algo-select-outlined-label">
                    Algorithm
                  </InputLabel>
                  <Select
                    labelId="algo-select-outlined-label"
                    id="algo-select-outlined"
                    value={compressorStore.compressAlgorithm}
                    onChange={handleAlgoChange}
                    label="Algorithm"
                  >
                    <MenuItem value={CompressionAlgorithm.LZ_STRING}>
                      {compressionAlgorithmLabel(
                        CompressionAlgorithm.LZ_STRING
                      )}
                    </MenuItem>
                    <MenuItem value={CompressionAlgorithm.ZLIB}>
                      {compressionAlgorithmLabel(CompressionAlgorithm.ZLIB)}
                    </MenuItem>
                    <MenuItem value={CompressionAlgorithm.ZIP}>
                      {compressionAlgorithmLabel(CompressionAlgorithm.ZIP)}
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl variant="outlined">
                  <InputLabel id="format-select-outlined-label">
                    Format
                  </InputLabel>
                  <Select
                    labelId="format-select-outlined-label"
                    id="format-select-outlined"
                    value={compressorStore.compressFormat}
                    onChange={handleFormatChange}
                    label="Format"
                  >
                    <MenuItem value={CompressionFormat.BASE64}>
                      {compressionFormatLabel(CompressionFormat.BASE64)}
                    </MenuItem>
                    <MenuItem value={CompressionFormat.BYTE_ARRAY}>
                      {compressionFormatLabel(CompressionFormat.BYTE_ARRAY)}
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
                    onClick={() => handleCompress()}
                  >
                    Compress
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<ArrowUpwardIcon />}
                    onClick={() => handleDecompress()}
                  >
                    Decompress
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <LargeTextArea
                id="compressed-input"
                value={output}
                onChange={setOutput}
                placeholder={"Output results"}
              />
            </Grid>
          </Grid>
          {compressorStore.compressResult ? (
            <Grid
              data-id="results-section"
              container
              item
              direction={"column"}
              spacing={1}
            >
              <Grid item>
                <Typography variant="h6">Results</Typography>
              </Grid>
              <Grid item>
                <Table aria-label="results table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Algorithm</TableCell>
                      <TableCell>Format</TableCell>
                      <TableCell>Time taken</TableCell>
                      <TableCell>Original size</TableCell>
                      <TableCell>Compressed size</TableCell>
                      <TableCell>Saving</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        {compressionAlgorithmLabel(
                          compressorStore.compressResult.compressAlgorithm
                        )}
                      </TableCell>
                      <TableCell>
                        {compressionFormatLabel(
                          compressorStore.compressResult.compressFormat
                        )}
                      </TableCell>
                      <TableCell>
                        {compressorStore.compressResult.time}
                      </TableCell>
                      <TableCell>
                        {compressorStore.compressResult.originalSize}
                      </TableCell>
                      <TableCell>
                        {compressorStore.compressResult.compressedSize}
                      </TableCell>
                      <TableCell>
                        {compressorStore.compressResult.reductionSize}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
      <LoadingDialog open={compressorStore.loading} title={"Compressing..."} />
    </Grid>
  );
}
