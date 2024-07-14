import { ComponentType, defineComponent, Types } from "bitecs";
import { ComponentProxy } from "../../bitECS/ComponentProxy";
import { Sprite as PixiSprite } from "pixi.js";
import { DataField } from "../../bitECS/DataField";

export const SpriteSchema = {
  texture: Types.ui32,
  sprite: Types.ui32
};
export type SpriteSchemaType = ComponentType<typeof SpriteSchema>;

export class SpriteProxy extends ComponentProxy<SpriteSchemaType> {
  textureData = new DataField<string>();
  spriteData = new DataField<PixiSprite>();

  constructor() {
    super(defineComponent(SpriteSchema));
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
