import {
  Box,
  CircularProgress,
  CircularProgressProps,
  Typography
} from "@material-ui/core";
import React from "react";

export function ProgressWithLabel(
  props: CircularProgressProps & { label: string }
) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" size={120} {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h1" component="div" color="textSecondary">
          {props.label}
        </Typography>
      </Box>
    </Box>
  );
}
