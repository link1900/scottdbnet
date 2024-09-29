import csvParser from "papaparse";
import { XMLBuilder } from "fast-xml-parser";
import { generateArray } from "./arrayHelper";
import {
  randomBoolean,
  randomDate,
  randomInteger,
  randomString
} from "./randomHelper";

export enum SampleType {
  STRING = "STRING",
  TEXT = "TEXT",
  JSON = "JSON",
  XML = "XML",
  CSV = "CSV"
}

export type SampleGeneratorOptions = {
  type: SampleType;
  sizeInBytes: number;
};

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

export function getSizeFloor(byteSize: number, baseFactor: number = 1): number {
  return Math.max(Math.floor(byteSize / baseFactor), 1);
}

export function sampleWord(): string {
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

export function sampleText(length: number): string {
  const values = Array(length);
  for (let i = 0; i < values.length; i++) {
    values[i] = sampleWord();
  }
  return values.join(" ");
}

export function sampleJson(
  type: "person" | "object" | "array" | "wrapped-array" = "person",
  size: number = 7
): object {
  if (type === "array") {
    return generateArray(size, () => sampleJsonObject());
  }
  if (type === "wrapped-array") {
    return {
      data: generateArray(size, () => sampleJsonObject())
    };
  }
  if (type === "object") {
    return sampleJsonObject(size);
  }
  return sampleJsonObject();
}

export function sampleJsonObject(fieldCount?: number): object {
  if (fieldCount) {
    return generateArray(fieldCount, () => {
      return [sampleWord(), sampleWord()];
    }).reduce((ob: any, [key, value]) => {
      ob[key] = value;
      return ob;
    }, {});
  }
  return {
    firstName: sampleWord(),
    lastName: sampleWord(),
    lastVisit: randomDate({ daysPast: randomInteger(1, 5) }),
    active: randomBoolean(),
    age: randomInteger(0, 99),
    friends: generateArray(randomInteger(0, 5), () => sampleWord())
  };
}

export function sampleCsv(size: number = 7): string {
  return csvParser.unparse(
    generateArray(size, () => sampleJsonObject()),
    { quotes: true }
  );
}

export function sampleXml(size: number = 7): string {
  return new XMLBuilder({ arrayNodeName: "person", format: true }).build(
    generateArray(size, () => sampleJsonObject())
  );
}

export function sampleGenerator(options: SampleGeneratorOptions): string {
  const { type, sizeInBytes } = options;
  switch (type) {
    case SampleType.STRING:
      return randomString(sizeInBytes);
    case SampleType.TEXT:
      return sampleText(getSizeFloor(sizeInBytes, 6));
    case SampleType.JSON:
      return JSON.stringify(
        sampleJson("wrapped-array", getSizeFloor(sizeInBytes, 300)),
        null,
        2
      );
    case SampleType.CSV:
      return sampleCsv(getSizeFloor(sizeInBytes, 140));
    case SampleType.XML:
      return sampleXml(getSizeFloor(sizeInBytes, 380));
  }
}
