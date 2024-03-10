import { defineComponent, Types } from "bitecs";
import { ComponentProxy, EntityProxy } from "../../bitECS/proxyHelper";
import { PixiGame } from "../PixiGame";

export const Sprite = defineComponent({
  texture: Types.ui32
});

export interface SpriteOptions {
  texture: string;
}

export function spriteBuilder(
  game: PixiGame,
  spriteEntity: EntityProxy<{ sprite: ComponentProxy<typeof Sprite> }>,
  options: SpriteOptions
): EntityProxy<{ sprite: ComponentProxy<typeof Sprite> }> {
  spriteEntity.sprite.texture = game.getAssetValue(options.texture);
  return spriteEntity;
}
