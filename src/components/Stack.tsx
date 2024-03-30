import { Grid, GridSize } from "@material-ui/core";
import { GridSpacing } from "@material-ui/core/Grid/Grid";
import { isArray } from "lodash";
import React from "react";
import { ReactChild } from "../tools/components/ReactChild";
import { isPresent } from "../util/arrayHelper";
import { itemAlignmentConverter } from "./layoutHelper";

export type AlignType = "left" | "center" | "right";

export type StackProps = {
  align?: AlignType;
  spacing?: GridSpacing;
  children: ReactChild;
  xs?: GridSize;
  sm?: GridSize;
  md?: GridSize;
  lg?: GridSize;
  xl?: GridSize;
};

export function Stack(props: StackProps) {
  const { children, align = "left", spacing = 2, xs, sm, md, lg, xl } = props;
  const childrenItems: React.ReactElement[] = (isArray(children)
    ? children
    : [children]) as any as React.ReactElement[];
  return (
    <Grid
      container
      direction="column"
      spacing={spacing}
      alignItems={itemAlignmentConverter(align)}
    >
      {childrenItems.filter(isPresent).map((child, i) => {
        return (
          <Grid key={i} item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
            {child}
          </Grid>
        );
      })}
    </Grid>
  );
}
