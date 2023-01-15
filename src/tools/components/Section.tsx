import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { ReactChild } from "./ReactChild";

export type SectionProps = {
  title: string;
  children: ReactChild;
};

export function Section(props: SectionProps) {
  const { title, children } = props;
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
      </Grid>
      <Grid item>{children}</Grid>
    </Grid>
  );
}
