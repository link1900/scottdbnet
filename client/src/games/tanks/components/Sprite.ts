import { defineComponent, Types } from "bitecs";

export enum SpriteType {
  ARCADE,
  STATIC
}

export const Sprite = defineComponent({
  texture: Types.ui8,
  type: Types.ui8
});
