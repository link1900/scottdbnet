import {
  GridItemsAlignment,
  GridJustification
} from "@material-ui/core/Grid/Grid";
import { AlignType } from "./Row";

export function gridAlignmentConverter(align: AlignType): GridJustification {
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

export function itemAlignmentConverter(align: AlignType): GridItemsAlignment {
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
