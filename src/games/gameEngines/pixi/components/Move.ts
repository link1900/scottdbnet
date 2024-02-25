import { defineComponent, Types } from "bitecs";

export enum Direction {
  None,
  Left,
  Right,
  Up,
  Down
}

export const Move = defineComponent({
  direction: Types.ui8
});
