import React from "react";
import { Grid, GridSize, Typography } from "@material-ui/core";
import { ReactChild } from "./ReactChild";

export type PageLayoutProps = {
  title: string;
  children: ReactChild;
  xs?: GridSize;
  sm?: GridSize;
  md?: GridSize;
  lg?: GridSize;
  xl?: GridSize;
};

export function PageLayout(props: PageLayoutProps) {
  const { title, children, xs, sm, md, lg, xl } = props;
  return (
    <Grid container justifyContent="center" spacing={6}>
      <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
        <Grid container direction={"column"} spacing={2}>
          <Grid item>
            <Typography variant="h4" component="h1">
              {title}
            </Typography>
          </Grid>
          <Grid item>{children}</Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
