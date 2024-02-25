import { defineComponent, Types } from "bitecs";

export const Bot = defineComponent({
  timeBetweenActions: Types.ui32,
  accumulatedTime: Types.ui32
});
