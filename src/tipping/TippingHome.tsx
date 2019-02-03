import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';

function TippingHome() {
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Paper>
          <Typography variant="headline">Tipping</Typography>
          <Typography variant="body1">
            Put your knowledge to the test in this classic fantasy tipping game. Start a league of your own and compete
            against your family and friends to see who is the best greyhound tipper!
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default TippingHome;
