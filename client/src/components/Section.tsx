import React from "react";
import { Grid } from "@material-ui/core";
import { ReactChild } from "../tools/components/ReactChild";
import { SectionTitle } from "./SectionTitle";

export type SectionProps = {
  title: string;
  children: ReactChild;
};

export function Section(props: SectionProps) {
  const { title, children } = props;
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <SectionTitle title={title} />
      </Grid>
      <Grid item>{children}</Grid>
    </Grid>
  );
}
