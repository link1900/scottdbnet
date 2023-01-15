import random from "lodash/random";
import { generateArray } from "./arrayHelper";

export const NUMBERS = "0123456789";
export const CHARS_LOWER = "abcdefghijklmnopqrstuvwxyz";
export const CHARS_UPPER = CHARS_LOWER.toUpperCase();
export const SYMBOLS = "!@#$%^&*()[]";
export const ALL_CHARACTERS = NUMBERS + CHARS_LOWER + CHARS_UPPER + SYMBOLS;

export function randomCharacter(characterString: string = ALL_CHARACTERS) {
  return characterString.charAt(randomInteger(0, characterString.length - 1));
}

export function randomString(
  length: number,
  characterString: string = ALL_CHARACTERS
) {
  const values = Array(length);
  for (let i = 0; i < values.length; i++) {
    values[i] = randomCharacter(characterString);
  }
  return values.join("");
}

export function randomInteger(
  min: number = Number.MIN_SAFE_INTEGER,
  max: number = Number.MAX_SAFE_INTEGER
): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomIntegerArray(
  length: number,
  min: number = Number.MIN_SAFE_INTEGER,
  max: number = Number.MAX_SAFE_INTEGER
): number[] {
  return generateArray(length, () => randomInteger(min, max));
}

export type RandomBooleanOptions = {
  likelihood?: number;
};

export function randomBoolean(options: RandomBooleanOptions = {}) {
  const { likelihood = 50 } = options;
  return random(0, 99) < likelihood;
}

export type RandomDateOptions = {
  daysPast?: number;
  daysFuture?: number;
};

export function randomDate(options: RandomDateOptions = {}): Date {
  const { daysPast = 0, daysFuture = 0 } = options;
  return new Date(
    Date.now() -
      daysPast * randomInteger(0, 86400000) +
      daysFuture * randomInteger(0, 86400000)
  );
}

export function randomElement<T>(items: T[]): T {
  return items[randomInteger(0, items.length - 1)];
}
