import { fromByteArray, toByteArray } from "base64-js";
import lzString from "lz-string";
import pako from "pako";
import prettyBytes from "pretty-bytes";

const utf16Decoder = new TextDecoder("utf-16");
const utf8Decoder = new TextDecoder("utf-8");
const utf16Encoder = new TextEncoder();

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
  LZ_STRING = "LZ_STRING",
  ZLIB = "ZLIB"
}

export enum CompressionFormat {
  UTF8 = "UTF8",
  UTF16 = "UTF16",
  BASE64 = "BASE64"
}

export interface CompressionOptions {
  algorithm?: CompressionAlgorithm;
  format?: CompressionFormat;
}

export function compressionFormatLabel(format: CompressionFormat): string {
  switch (format) {
    case CompressionFormat.BASE64:
      return "Base64";
    case CompressionFormat.UTF16:
      return "UTF-16";
    case CompressionFormat.UTF8:
      return "UTF-8";
  }

  return "";
}

export function compressionAlgorithmLabel(
  format: CompressionAlgorithm
): string {
  switch (format) {
    case CompressionAlgorithm.LZ_STRING:
      return "LZ String";
    case CompressionAlgorithm.ZLIB:
      return "zlib";
  }

  return "";
}

export function compress(
  value: string,
  options: CompressionOptions = {}
): string {
  const {
    algorithm = CompressionAlgorithm.LZ_STRING,
    format = CompressionFormat.BASE64
  } = options;
  if (algorithm === CompressionAlgorithm.LZ_STRING) {
    if (format === CompressionFormat.BASE64) {
      return lzString.compressToEncodedURIComponent(value);
    }
    if (format === CompressionFormat.UTF16) {
      return lzString.compressToUTF16(value);
    }
    if (format === CompressionFormat.UTF8) {
      return utf8Decoder.decode(lzString.compressToUint8Array(value));
    }
  }

  if (algorithm === CompressionAlgorithm.ZLIB) {
    const compress = pako.deflate(value);
    if (format === CompressionFormat.BASE64) {
      return fromByteArray(compress);
    }
    if (format === CompressionFormat.UTF16) {
      return utf16Decoder.decode(compress);
    }
    if (format === CompressionFormat.UTF8) {
      return utf8Decoder.decode(lzString.compressToUint8Array(value));
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
    format = CompressionFormat.BASE64
  } = options;
  if (algorithm === CompressionAlgorithm.LZ_STRING) {
    if (format === CompressionFormat.BASE64) {
      return lzString.decompressFromEncodedURIComponent(value) ?? "";
    }
    if (format === CompressionFormat.UTF16) {
      return lzString.decompressFromUTF16(value) ?? "";
    }
    if (format === CompressionFormat.UTF8) {
      return (
        lzString.decompressFromUint8Array(utf16Encoder.encode(value)) ?? ""
      );
    }
  }

  if (algorithm === CompressionAlgorithm.ZLIB) {
    if (format === CompressionFormat.BASE64) {
      return pako.inflate(toByteArray(value), { to: "string" });
    }
    if (
      format === CompressionFormat.UTF16 ||
      format === CompressionFormat.UTF8
    ) {
      return pako.inflate(utf16Encoder.encode(value), { to: "string" });
    }
  }

  return "";
}
