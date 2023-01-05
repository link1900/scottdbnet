import React from "react";
import { Typography } from "@material-ui/core";

interface Props {
  message?: string;
}

export function ErrorMessage(props: Props) {
  const { message = "There was an unexpected error" } = props;
  return <Typography gutterBottom>{message}</Typography>;
}
