import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import { LoadingSpinner } from "./LoadingSpinner";

interface Props {
  minHeight?: number;
  minWidth?: number;
  message?: string;
}

export function LoadingCard(props: Props) {
  const { minHeight, minWidth, message } = props;
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <LoadingSpinner minHeight={minHeight} minWidth={minWidth} />
          </Grid>
          {message ? (
            <Grid item>
              <Typography>{message}</Typography>
            </Grid>
          ) : null}
        </Grid>
      </CardContent>
    </Card>
  );
}
