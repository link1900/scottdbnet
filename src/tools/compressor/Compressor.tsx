import React from "react";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@material-ui/core";
import {
  getBenchmarkEndTimeString,
  getBenchmarkStartTime
} from "../../util/dateTimeHelper";
import {
  compress,
  CompressionFormat,
  decompress,
  formatBytes,
  getStringSizeInBytes
} from "../../util/stringHelper";

export interface CompressResult {
  operation: string;
  time: string;
  originalSize: string;
  compressedSize: string;
  reductionSize: string;
}

export interface CompressorStore {
  raw: string;
  compressed: string;
  compressResult: CompressResult | undefined;
  compressFormat: CompressionFormat;
}

export default function Compressor() {
  const [compressorStore, setCompressorStore] = React.useState<CompressorStore>(
    {
      raw: "This is an example value",
      compressed: "",
      compressResult: undefined,
      compressFormat: CompressionFormat.BASE64_ENCODED
    }
  );

  const updateStore = (updatedStore: Partial<CompressorStore>) => {
    setCompressorStore({
      ...compressorStore,
      ...updatedStore
    });
  };

  const handleTextChange = (event: any) => {
    updateStore({ raw: event.target.value });
  };

  const handleCompressInputChange = (event: any) => {
    updateStore({ compressed: event.target.value });
  };

  const handleCompress = () => {
    const start = getBenchmarkStartTime();
    const compressed = compress(compressorStore.raw, {
      format: compressorStore.compressFormat
    });
    const operation = "compress";
    const time = getBenchmarkEndTimeString(start);
    const originalSizeBytes = getStringSizeInBytes(compressorStore.raw);
    const compressedSizeBytes = getStringSizeInBytes(compressed);
    const reductionSizeBytes = originalSizeBytes - compressedSizeBytes;
    const compressResult = {
      operation,
      time,
      originalSize: formatBytes(originalSizeBytes),
      compressedSize: formatBytes(compressedSizeBytes),
      reductionSize: formatBytes(reductionSizeBytes)
    };
    updateStore({ compressed, compressResult });
  };

  const handleDecompress = () => {
    const start = getBenchmarkStartTime();
    const raw =
      decompress(compressorStore.compressed, {
        format: compressorStore.compressFormat
      }) ?? "";
    const operation = "decompress";
    const time = getBenchmarkEndTimeString(start);
    const originalSizeBytes = getStringSizeInBytes(raw);
    const compressedSizeBytes = getStringSizeInBytes(
      compressorStore.compressed
    );
    const reductionSizeBytes = originalSizeBytes - compressedSizeBytes;
    const compressResult = {
      operation,
      time,
      originalSize: formatBytes(originalSizeBytes),
      compressedSize: formatBytes(compressedSizeBytes),
      reductionSize: formatBytes(reductionSizeBytes)
    };
    updateStore({ raw, compressResult });
  };

  const handleFormatChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedValue = event.target.value;
    if (selectedValue === CompressionFormat.BASE64_ENCODED) {
      updateStore({ compressFormat: CompressionFormat.BASE64_ENCODED });
    }
    if (selectedValue === CompressionFormat.UTF16) {
      updateStore({ compressFormat: CompressionFormat.UTF16 });
    }
    if (selectedValue === CompressionFormat.UTF16_SAFE) {
      updateStore({ compressFormat: CompressionFormat.UTF16_SAFE });
    }
    if (selectedValue === CompressionFormat.BASE64) {
      updateStore({ compressFormat: CompressionFormat.BASE64 });
    }
  };

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12} sm={8}>
        <Grid container direction={"column"} spacing={2}>
          <Grid item>
            <TextField
              id="raw-text-input"
              label="Text to compress"
              multiline
              fullWidth
              minRows={10}
              maxRows={10}
              value={compressorStore.raw}
              onChange={handleTextChange}
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <FormControl>
              <InputLabel id="format-select-outlined-label">Format</InputLabel>
              <Select
                labelId="format-select-outlined-label"
                id="format-select-outlined"
                value={compressorStore.compressFormat}
                onChange={handleFormatChange}
                label="Format"
              >
                <MenuItem value={CompressionFormat.BASE64_ENCODED}>
                  Base64 url safe
                </MenuItem>
                <MenuItem value={CompressionFormat.BASE64}>Base64</MenuItem>
                <MenuItem value={CompressionFormat.UTF16_SAFE}>
                  UTF16 Safe
                </MenuItem>
                <MenuItem value={CompressionFormat.UTF16}>UTF16</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid data-id="options" item>
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
              <Grid />
            </Grid>
          </Grid>
          <Grid item>
            <TextField
              id="input-compressed"
              label="Compressed text"
              multiline
              fullWidth
              minRows={10}
              maxRows={10}
              value={compressorStore.compressed}
              onChange={handleCompressInputChange}
              variant="outlined"
            />
          </Grid>
          {compressorStore.compressResult ? (
            <Grid item>
              <Grid item>
                <Typography>
                  Operation: {compressorStore.compressResult.operation}
                </Typography>
              </Grid>
              <Grid item>
                <Typography>
                  Time taken: {compressorStore.compressResult.time}
                </Typography>
              </Grid>
              <Grid item>
                <Typography>
                  Original size: {compressorStore.compressResult.originalSize}
                </Typography>
              </Grid>
              <Grid item>
                <Typography>
                  Compressed size:{" "}
                  {compressorStore.compressResult.compressedSize}
                </Typography>
              </Grid>
              <Grid item>
                <Typography>
                  Saved: {compressorStore.compressResult.reductionSize}
                </Typography>
              </Grid>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    </Grid>
  );
}
