import lodashShuffle from "lodash/shuffle";
import random from "lodash/random";
import { faker } from "@faker-js/faker/locale/en_AU";
import csvParser from "papaparse";
import { XMLBuilder } from "fast-xml-parser";
import { generateArray } from "./arrayHelper";

faker.setLocale("en_AU");
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

export function randomText(number: number): string {
  return faker.random.words(number);
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
      return [faker.word.noun(), faker.random.word()];
    }).reduce((ob: any, [key, value]) => {
      ob[key] = value;
      return ob;
    }, {});
  }
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phone: faker.phone.number(),
    imageUrl: faker.image.imageUrl(),
    state: faker.address.state(),
    lastVisit: faker.date.recent(),
    active: faker.datatype.boolean(),
    age: faker.datatype.number({ min: 0, max: 99 }),
    friends: generateArray(faker.datatype.number({ min: 0, max: 5 }), () =>
      faker.name.firstName()
    )
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
