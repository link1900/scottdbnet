import { defineComponent, Types } from "bitecs";
import { ComponentProxy } from "../../bitECS/ComponentProxy";
import { Sprite as PixiSprite } from "pixi.js";
import { DataField } from "../../bitECS/DataField";

export const Sprite = defineComponent({
  texture: Types.ui32,
  sprite: Types.ui32
});

export class SpriteProxy extends ComponentProxy<typeof Sprite> {
  textureData = new DataField<string>();
  spriteData = new DataField<PixiSprite>();

  constructor() {
    super("sprite", Sprite);
  }

  get texture(): string | null {
    return this.getDataValue(this.textureData, this.component.texture);
  }

  set texture(val: string | null) {
    this.setDataValue(this.textureData, this.component.texture, val);
  }

  get sprite(): PixiSprite | null {
    return this.getDataValue(this.spriteData, this.component.sprite);
  }

  set sprite(val: PixiSprite | null) {
    this.setDataValue(this.spriteData, this.component.sprite, val);
  }
}
