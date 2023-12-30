import React from "react";
import { Typography } from "@material-ui/core";

export interface SectionTitleProps {
  title: string;
}

export function SectionTitle(props: SectionTitleProps) {
  return (
    <Typography variant="h6" component="h2">
      {props.title}
    </Typography>
  );
}
