import { CircularProgress, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";

export interface ScreenLoaderProps {
  open: boolean;
  title?: string;
  description?: string;
  onCancel?: () => void;
}

export default function LoadingDialog(props: ScreenLoaderProps) {
  const { open, title = "Loading...", description, onCancel } = props;

  return (
    <Dialog open={open} aria-labelledby="loading-dialog-title">
      <DialogTitle id="loading-dialog-title">{title}</DialogTitle>
      <DialogContent style={{ width: 250, height: 80 }}>
        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <Grid container direction={"column"} spacing={2}>
              <Grid item>
                <CircularProgress />
              </Grid>
              {description ? <Grid item>{description}</Grid> : null}
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      {onCancel ? (
        <DialogActions>
          <Button onClick={onCancel} color="primary">
            Cancel
          </Button>
        </DialogActions>
      ) : null}
    </Dialog>
  );
}
