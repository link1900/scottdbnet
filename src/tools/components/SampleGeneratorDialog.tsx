import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select
} from "@material-ui/core";
import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import {
  randomCsv,
  randomJson,
  randomString,
  randomText,
  randomXml
} from "../../util/randomHelper";

export enum SampleType {
  STRING = "STRING",
  TEXT = "TEXT",
  JSON = "JSON",
  XML = "XML",
  CSV = "CSV"
}

export interface SampleGeneratorDialogProps {
  onGenerate?: (generated: string) => void;
}

export function getSizeFloor(byteSize: number, baseFactor: number = 1): number {
  return Math.max(Math.floor(byteSize / baseFactor), 1);
}

export default function SampleGeneratorDialog(
  props: SampleGeneratorDialogProps
) {
  const [open, setOpen] = React.useState(false);
  const [size, setSize] = React.useState<string>("10240");
  const [type, setType] = React.useState<SampleType>(SampleType.TEXT);
  const { onGenerate } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSampleGenerate = () => {
    if (onGenerate) {
      const byteSize = parseInt(size, 10);
      switch (type) {
        case SampleType.STRING:
          onGenerate(randomString(byteSize));
          break;
        case SampleType.TEXT:
          onGenerate(randomText(getSizeFloor(byteSize, 6)));
          break;
        case SampleType.JSON:
          onGenerate(
            JSON.stringify(
              randomJson("wrapped-array", getSizeFloor(byteSize, 300)),
              null,
              2
            )
          );
          break;
        case SampleType.CSV:
          onGenerate(randomCsv(getSizeFloor(byteSize, 140)));
          break;
        case SampleType.XML:
          onGenerate(randomXml(getSizeFloor(byteSize, 380)));
          break;
      }
    }
    handleClose();
  };

  return (
    <div>
      <Grid item>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          startIcon={<NoteAddIcon fontSize="small" />}
          onClick={() => handleClickOpen()}
        >
          Sample
        </Button>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="example-dialog-title"
      >
        <DialogTitle id="example-dialog-title">
          Sample generator options
        </DialogTitle>
        <DialogContent style={{ width: 250, height: 80 }}>
          <Grid container direction="column" spacing={2}>
            <Grid
              item
              container
              direction="row"
              alignItems="center"
              spacing={2}
            >
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSampleGenerate} color="primary">
            Generate
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
