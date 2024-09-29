import React from "react";
import { Typography } from "@material-ui/core";

export interface PageTitleProps {
  title: string;
}

export function PageTitle(props: PageTitleProps) {
  return (
    <Typography variant="h4" component="h1">
      {props.title}
    </Typography>
  );
}
