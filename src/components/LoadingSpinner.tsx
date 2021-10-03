import { makeStyles } from '@material-ui/core/styles';
import { Box, CircularProgress, Grid, Typography } from '@material-ui/core';
import React from 'react';

interface Props {
  minHeight?: number;
  minWidth?: number;
  message?: string;
}

const useStyles = makeStyles((theme) => ({
  loadingArea: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    flexDirection: 'row'
  }
}));

export function LoadingSpinner(props: Props) {
  const { minHeight = 152, minWidth = 152, message } = props;
  const classes = useStyles();
  return (
    <Box className={classes.loadingArea} style={{ minHeight, minWidth }}>
      <Grid container spacing={2} direction="column" justify="center" alignItems="center">
        <Grid item>
          <CircularProgress />
        </Grid>
        {message ? (
          <Grid item>
            <Typography>{message}</Typography>
          </Grid>
        ) : null}
      </Grid>
    </Box>
  );
}
