import { Grid } from "@material-ui/core";
import { GridItemsAlignment, GridSpacing } from "@material-ui/core/Grid/Grid";
import { isArray } from "lodash";
import React from "react";
import { ReactChild } from "../tools/components/ReactChild";

export type AlignType = "left" | "center" | "right";

export type DirectionType = "row" | "column";

export type StackProps = {
  direction?: DirectionType;
  align?: AlignType;
  spacing?: GridSpacing;
  children: ReactChild;
};

function alignmentConverter(align: AlignType): GridItemsAlignment {
  switch (align) {
    case "left":
      return "flex-start";
    case "right":
      return "flex-end";
    case "center":
      return "center";
    default:
      return "flex-start";
  }
}

export function Stack(props: StackProps) {
  const { children, direction = "column", align = "left", spacing = 2 } = props;
  const childrenItems: React.ReactElement[] = (isArray(children)
    ? children
    : [children]) as any as React.ReactElement[];
  return (
    <Grid
      container
      direction={direction}
      spacing={spacing}
      alignItems={alignmentConverter(align)}
    >
      {childrenItems.map((child, i) => {
        return (
          <Grid key={i} item>
            {child}
          </Grid>
        );
      })}
    </Grid>
  );
}
