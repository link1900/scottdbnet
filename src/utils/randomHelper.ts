import { generateArray } from './arrayHelper';

export function randomInteger(min: number = Number.MIN_SAFE_INTEGER, max: number = Number.MAX_SAFE_INTEGER): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomIntegerArray(
  length: number,
  min: number = Number.MIN_SAFE_INTEGER,
  max: number = Number.MAX_SAFE_INTEGER
): number[] {
  return generateArray(length, () => randomInteger(min, max));
}
