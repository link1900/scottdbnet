import prettyBytes from "pretty-bytes";
import { v4 } from "uuid";
import { isPresent } from "./arrayHelper";

export function base64EncodeString(value: string | null | undefined): string {
  if (!value) {
    return "";
  }

  return btoa(value);
}

export function base64DecodeString(value: string | null | undefined): string {
  if (!value) {
    return "";
  }

  return atob(value);
}

export function formatBytes(bytes: number): string {
  return prettyBytes(bytes);
}

export function getStringSizeInBytes(value: string): number {
  return new Blob([value]).size;
}

export function uuid(): string {
  return v4();
}

export function splitLines(input: string): string[] {
  return input.split(/\r?\n/).filter(isPresent);
}
