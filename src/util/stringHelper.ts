import lzString from "lz-string";
import prettyBytes from "pretty-bytes";

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

export enum CompressionAlgorithm {
  LZ_STRING = "LZ_STRING"
}

export enum CompressionFormat {
  UTF16 = "UTF16",
  UTF16_SAFE = "UTF16_SAFE",
  BASE64 = "BASE64",
  BASE64_ENCODED = "BASE64_ENCODED"
}

export interface CompressionOptions {
  algorithm?: CompressionAlgorithm;
  format?: CompressionFormat;
}

export function compress(
  value: string,
  options: CompressionOptions = {}
): string {
  const {
    algorithm = CompressionAlgorithm.LZ_STRING,
    format = CompressionFormat.BASE64_ENCODED
  } = options;
  if (algorithm === CompressionAlgorithm.LZ_STRING) {
    if (format === CompressionFormat.BASE64_ENCODED) {
      return lzString.compressToEncodedURIComponent(value);
    }
    if (format === CompressionFormat.BASE64) {
      return lzString.compressToBase64(value);
    }
    if (format === CompressionFormat.UTF16) {
      return lzString.compress(value);
    }
    if (format === CompressionFormat.UTF16_SAFE) {
      return lzString.compressToUTF16(value);
    }
  }

  return "";
}

export function decompress(
  value: string,
  options: CompressionOptions = {}
): string {
  const {
    algorithm = CompressionAlgorithm.LZ_STRING,
    format = CompressionFormat.BASE64_ENCODED
  } = options;
  if (algorithm === CompressionAlgorithm.LZ_STRING) {
    if (format === CompressionFormat.BASE64_ENCODED) {
      return lzString.decompressFromEncodedURIComponent(value) ?? "";
    }
    if (format === CompressionFormat.BASE64) {
      return lzString.decompressFromBase64(value) ?? "";
    }
    if (format === CompressionFormat.UTF16) {
      return lzString.decompress(value) ?? "";
    }
    if (format === CompressionFormat.UTF16_SAFE) {
      return lzString.decompressFromUTF16(value) ?? "";
    }
  }

  return "";
}
