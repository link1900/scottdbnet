import { fromByteArray, toByteArray } from "base64-js";
import lzString from "lz-string";
import pako from "pako";
import {
  getBenchmarkEndTimeString,
  getBenchmarkStartTime
} from "./dateTimeHelper";
import { getStringSizeInBytes } from "./stringHelper";

export enum CompressionAlgorithm {
  LZ_STRING = "LZ_STRING",
  ZLIB = "ZLIB"
}

export enum CompressionFormat {
  UTF8 = "UTF8",
  UTF16 = "UTF16",
  BASE64 = "BASE64"
}

export enum CompressorOperations {
  COMPRESS = "COMPRESS",
  DECOMPRESS = "DECOMPRESS"
}

export interface CompressionOptions {
  input: string;
  operation: CompressorOperations;
  algorithm: CompressionAlgorithm;
  format: CompressionFormat;
}

export interface CompressionResult {
  output: string;
  operation: CompressorOperations;
  algorithm: CompressionAlgorithm;
  format: CompressionFormat;
  time: string;
  originalSize: number;
  compressedSize: number;
  reductionSize: number;
}

const utf16Decoder = new TextDecoder("utf-16");
const utf8Decoder = new TextDecoder("utf-8");
const utf16Encoder = new TextEncoder();

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

export function runCompressionOperation(
  options: CompressionOptions
): CompressionResult {
  const { input, operation } = options;
  const start = getBenchmarkStartTime();
  let output: string = "";

  switch (operation) {
    case CompressorOperations.DECOMPRESS:
      output = decompress(options);
      break;
    default:
      output = compress(options);
      break;
  }

  const time = getBenchmarkEndTimeString(start);
  const originalSizeBytes = getStringSizeInBytes(input);
  const compressedSizeBytes = getStringSizeInBytes(output);
  const reductionSizeBytes = originalSizeBytes - compressedSizeBytes;
  return {
    output,
    operation: options.operation,
    format: options.format,
    algorithm: options.algorithm,
    time,
    originalSize: originalSizeBytes,
    compressedSize: compressedSizeBytes,
    reductionSize: reductionSizeBytes
  };
}

export function compress(options: CompressionOptions): string {
  const {
    input,
    algorithm = CompressionAlgorithm.LZ_STRING,
    format = CompressionFormat.BASE64
  } = options;
  if (algorithm === CompressionAlgorithm.LZ_STRING) {
    if (format === CompressionFormat.BASE64) {
      return lzString.compressToEncodedURIComponent(input);
    }
    if (format === CompressionFormat.UTF16) {
      return lzString.compressToUTF16(input);
    }
    if (format === CompressionFormat.UTF8) {
      return utf8Decoder.decode(lzString.compressToUint8Array(input));
    }
  }

  if (algorithm === CompressionAlgorithm.ZLIB) {
    const compress = pako.deflate(input);
    if (format === CompressionFormat.BASE64) {
      return fromByteArray(compress);
    }
    if (format === CompressionFormat.UTF16) {
      return utf16Decoder.decode(compress);
    }
    if (format === CompressionFormat.UTF8) {
      return utf8Decoder.decode(lzString.compressToUint8Array(input));
    }
  }

  return "";
}

export function decompress(options: CompressionOptions): string {
  const {
    input,
    algorithm = CompressionAlgorithm.LZ_STRING,
    format = CompressionFormat.BASE64
  } = options;
  if (algorithm === CompressionAlgorithm.LZ_STRING) {
    if (format === CompressionFormat.BASE64) {
      return lzString.decompressFromEncodedURIComponent(input) ?? "";
    }
    if (format === CompressionFormat.UTF16) {
      return lzString.decompressFromUTF16(input) ?? "";
    }
    if (format === CompressionFormat.UTF8) {
      return (
        lzString.decompressFromUint8Array(utf16Encoder.encode(input)) ?? ""
      );
    }
  }

  if (algorithm === CompressionAlgorithm.ZLIB) {
    if (format === CompressionFormat.BASE64) {
      return pako.inflate(toByteArray(input), { to: "string" });
    }
    if (
      format === CompressionFormat.UTF16 ||
      format === CompressionFormat.UTF8
    ) {
      return pako.inflate(utf16Encoder.encode(input), { to: "string" });
    }
  }

  return "";
}
