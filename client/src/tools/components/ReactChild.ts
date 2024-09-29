import React from "react";

export type ReactChild =
  | Array<React.ReactElement | null | undefined>
  | React.ReactElement
  | null
  | undefined;
