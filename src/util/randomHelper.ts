import lodashShuffle from "lodash/shuffle";
import random from "lodash/random";
import csvParser from "papaparse";
import { XMLBuilder } from "fast-xml-parser";
import { generateArray } from "./arrayHelper";

export const NUMBERS = "0123456789";
export const CHARS_LOWER = "abcdefghijklmnopqrstuvwxyz";
export const CHARS_UPPER = CHARS_LOWER.toUpperCase();
export const SYMBOLS = "!@#$%^&*()[]";
export const ALL_CHARACTERS = NUMBERS + CHARS_LOWER + CHARS_UPPER + SYMBOLS;
const LETTER_FREQUENCIES: any = {
  a: 0.08167,
  b: 0.01492,
  c: 0.02782,
  d: 0.04253,
  e: 0.12702,
  f: 0.02228,
  g: 0.02015,
  h: 0.06094,
  i: 0.06966,
  j: 0.00153,
  k: 0.00772,
  l: 0.04025,
  m: 0.02406,
  n: 0.06749,
  o: 0.07507,
  p: 0.01929,
  q: 0.00095,
  r: 0.05987,
  s: 0.06327,
  t: 0.09056,
  u: 0.02758,
  v: 0.00978,
  w: 0.0236,
  x: 0.0015,
  y: 0.01974,
  z: 0.00074
};

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

export function randomWord(): string {
  const wordLength = randomInteger(3, 12);
  let word = "";

  for (let i = 0; i < wordLength; i++) {
    let r = Math.random();
    let c = "";
    for (let j in LETTER_FREQUENCIES) {
      r -= LETTER_FREQUENCIES[j];
      if (r <= 0) {
        c = j;
        break;
      }
    }
    word += c;
  }

  return word;
}

export function randomText(length: number): string {
  const values = Array(length);
  for (let i = 0; i < values.length; i++) {
    values[i] = randomWord();
  }
  return values.join(" ");
}

export function randomJson(
  type: "person" | "object" | "array" | "wrapped-array" = "person",
  size: number = 7
): object {
  if (type === "array") {
    return generateArray(size, () => randomJsonObject());
  }
  if (type === "wrapped-array") {
    return {
      data: generateArray(size, () => randomJsonObject())
    };
  }
  if (type === "object") {
    return randomJsonObject(size);
  }
  return randomJsonObject();
}

export function randomJsonObject(fieldCount?: number): object {
  if (fieldCount) {
    return generateArray(fieldCount, () => {
      return [randomWord(), randomWord()];
    }).reduce((ob: any, [key, value]) => {
      ob[key] = value;
      return ob;
    }, {});
  }
  return {
    firstName: randomWord(),
    lastName: randomWord(),
    lastVisit: randomDate({ daysPast: randomInteger(1, 5) }),
    active: randomBoolean(),
    age: randomInteger(0, 99),
    friends: generateArray(randomInteger(0, 5), () => randomWord())
  };
}

export function randomCsv(size: number = 7): string {
  return csvParser.unparse(
    generateArray(size, () => randomJsonObject()),
    { quotes: true }
  );
}

export function randomXml(size: number = 7): string {
  return new XMLBuilder({ arrayNodeName: "person", format: true }).build(
    generateArray(size, () => randomJsonObject())
  );
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

export function shuffle<T>(items: T[]): T[] {
  return lodashShuffle(items);
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
