import { Button, Grid, TextField } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import CopyIcon from "@material-ui/icons/FileCopy";
import PasteIcon from "@material-ui/icons/FileCopyOutlined";
import { Alert } from "@material-ui/lab";
import React, { useEffect } from "react";
import SampleGeneratorDialog from "./SampleGeneratorDialog";

export interface LargeTextAreaProps {
  id?: string;
  label?: string;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  maxLength?: number;
}

export default function LargeTextArea(props: LargeTextAreaProps) {
  const {
    value = "",
    id = "large-text-area-input",
    label,
    onChange,
    placeholder,
    maxLength = 10000
  } = props;
  const [displayValue, setDisplayValue] = React.useState<string>("");
  const [showWarning, setShowWarning] = React.useState<boolean>(false);

  useEffect(() => {
    setShowWarning(value.length > maxLength);
    setDisplayValue(value.slice(0, maxLength));
  }, [value, maxLength]);

  const handleValueChange = (newValue: string) => {
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleTextChange = (event: React.ChangeEvent<{ value: string }>) => {
    handleValueChange(event.target.value);
  };

  const handlePaste = async () => {
    handleValueChange(await navigator.clipboard.readText());
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
  };

  const handleClear = () => {
    handleValueChange("");
  };

  const handleExampleGenerate = (generated: string) => {
    handleValueChange(generated);
  };

  return (
    <Grid data-id={`${id}-section`} container direction={"column"} spacing={1}>
      <Grid item>
        <TextField
          id={id}
          label={label}
          multiline
          fullWidth
          minRows={10}
          maxRows={10}
          placeholder={placeholder}
          inputProps={{
            maxLength: maxLength,
            autoComplete: "off",
            autoCorrect: "off",
            autoCapitalize: "off",
            spellCheck: "false"
          }}
          value={displayValue}
          onChange={handleTextChange}
          variant="outlined"
        />
      </Grid>
      {showWarning ? (
        <Grid item>
          <Alert severity="warning">
            This text is too long to display. The full text is still recorded.
            To get access to the complete text you can copy it.
          </Alert>
        </Grid>
      ) : null}
      <Grid
        data-id={`${id}-control-section`}
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
            startIcon={<CopyIcon fontSize="small" />}
            onClick={() => handleCopy()}
          >
            Copy
          </Button>
        </Grid>
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
  );
}
