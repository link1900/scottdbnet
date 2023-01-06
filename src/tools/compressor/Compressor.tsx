import React, { useRef, useState } from "react";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ClearIcon from "@material-ui/icons/Clear";
import CopyIcon from "@material-ui/icons/FileCopy";
import PasteIcon from "@material-ui/icons/FileCopyOutlined";
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
import { useWorker } from "../workers/useWorker";
import SampleGeneratorDialog from "../components/SampleGeneratorDialog";
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
  const rawInputRef = useRef<HTMLTextAreaElement>(null);
  const compressedInputRef = useRef<HTMLTextAreaElement>(null);

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

    const result = await runCompression({
      input: getRawInput(),
      operation: CompressorOperations.COMPRESS,
      format: compressorStore.compressFormat,
      algorithm: compressorStore.compressAlgorithm
    });

    console.log(`got result ${result.time}`);
    const compressResult = {
      compressAlgorithm: compressorStore.compressAlgorithm,
      compressFormat: compressorStore.compressFormat,
      time: result.time,
      originalSize: formatBytes(result.originalSize),
      compressedSize: formatBytes(result.compressedSize),
      reductionSize: formatBytes(result.reductionSize)
    };
    updateStore({ loading: false, compressResult });
    setCompressedInput(result.output);
  };

  const handleFormatChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedValue = event.target.value;
    updateStore({ compressFormat: selectedValue as CompressionFormat });
  };

  const handleAlgoChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedValue = event.target.value;
    updateStore({ compressAlgorithm: selectedValue as CompressionAlgorithm });
  };

  const handleExampleGenerate = (generated: string) => {
    setRawInput(generated);
  };

  const handleClear = () => {
    setCompressorStore(initState);
    setRawInput("");
    setCompressedInput("");
  };

  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    setRawInput(text);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(getCompressedInput());
  };

  const getRawInput = (): string => {
    if (rawInputRef.current) {
      return rawInputRef.current.value;
    } else {
      return "";
    }
  };

  const setRawInput = (value: string) => {
    if (rawInputRef.current) {
      rawInputRef.current.value = value;
    }
  };

  const setCompressedInput = (value: string) => {
    if (compressedInputRef.current) {
      compressedInputRef.current.value = value;
    }
  };

  const getCompressedInput = (): string => {
    if (compressedInputRef.current) {
      return compressedInputRef.current.value;
    } else {
      return "";
    }
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
              <textarea
                id="raw-text-input"
                rows={10}
                ref={rawInputRef}
                style={{ width: "100%" }}
                placeholder={"Enter or paste text here"}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
            </Grid>
            <Grid
              data-id="input-section-controls"
              container
              item
              direction="row"
              spacing={1}
            >
              <Grid item>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  startIcon={<PasteIcon fontSize="small" />}
                  onClick={() => handlePaste()}
                >
                  Paste
                </Button>
              </Grid>
              <Grid item>
                <SampleGeneratorDialog onGenerate={handleExampleGenerate} />
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  startIcon={<ClearIcon fontSize="small" />}
                  onClick={() => handleClear()}
                >
                  Clear
                </Button>
              </Grid>
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
                    <MenuItem value={CompressionFormat.UTF16}>
                      {compressionFormatLabel(CompressionFormat.UTF16)}
                    </MenuItem>
                    <MenuItem value={CompressionFormat.UTF8}>
                      {compressionFormatLabel(CompressionFormat.UTF8)}
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
              </Grid>
            </Grid>
            <Grid item>
              <textarea
                id="compressed-input"
                rows={10}
                ref={compressedInputRef}
                style={{ width: "100%" }}
                placeholder="Output results"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                startIcon={<CopyIcon fontSize="small" />}
                onClick={() => handleCopy()}
              >
                Copy
              </Button>
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
