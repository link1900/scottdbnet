import { Position } from "../../gameEngines/pixi/components/Position";
import { Sprite } from "../../gameEngines/pixi/components/Sprite";
import { PixiGame } from "../../gameEngines/pixi/PixiGame";

export function createBalloon(
  game: PixiGame,
  props: { x: number; y: number; texture: string }
) {
  const balloonId = game.createEntity();
  const balloon = game.addComponents(balloonId, {
    position: Position,
    sprite: Sprite
  });
  balloon.position.x = props.x;
  balloon.position.y = props.y;
  balloon.sprite.texture = game.stringMap.findIdByValue(props.texture) ?? 0;
  return balloon;
}
