import { fromByteArray, toByteArray } from "base64-js";
import JSZip from "jszip";
import lzString from "lz-string";
import pako from "pako";
import {
  getBenchmarkEndTimeString,
  getBenchmarkStartTime
} from "./dateTimeHelper";
import { getStringSizeInBytes } from "./stringHelper";

export enum CompressionAlgorithm {
  LZ_STRING = "LZ_STRING",
  ZLIB = "ZLIB",
  ZIP = "ZIP"
}

export enum CompressionFormat {
  BYTE_ARRAY = "BYTE_ARRAY",
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

export function compressionFormatLabel(format: CompressionFormat): string {
  switch (format) {
    case CompressionFormat.BASE64:
      return "Base64";
    case CompressionFormat.BYTE_ARRAY:
      return "Byte array";
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
    case CompressionAlgorithm.ZIP:
      return "zip";
  }

  return "";
}

export async function runCompressionOperation(
  options: CompressionOptions
): Promise<CompressionResult> {
  const { input, operation } = options;
  const start = getBenchmarkStartTime();
  let output: string = "";

  switch (operation) {
    case CompressorOperations.DECOMPRESS:
      output = await decompress(options);
      break;
    default:
      output = await compress(options);
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

export async function compress(options: CompressionOptions): Promise<string> {
  const { algorithm = CompressionAlgorithm.LZ_STRING } = options;

  switch (algorithm) {
    case CompressionAlgorithm.LZ_STRING:
      return compressLZString(options);
    case CompressionAlgorithm.ZLIB:
      return compressZlib(options);
    case CompressionAlgorithm.ZIP:
      return compressZip(options);
  }
}

async function compressLZString(options: CompressionOptions): Promise<string> {
  const { input, format } = options;
  switch (format) {
    case CompressionFormat.BASE64:
      return lzString.compressToEncodedURIComponent(input);
    case CompressionFormat.BYTE_ARRAY:
      return await uInt8ArrayToString(lzString.compressToUint8Array(input));
  }
}

async function compressZlib(options: CompressionOptions): Promise<string> {
  const { input, format } = options;
  const compress = pako.deflate(input);
  switch (format) {
    case CompressionFormat.BASE64:
      return fromByteArray(compress);
    case CompressionFormat.BYTE_ARRAY:
      return await uInt8ArrayToString(compress);
  }
}

async function compressZip(options: CompressionOptions): Promise<string> {
  const { input, format } = options;
  const zipFile = new JSZip();
  zipFile.file("input.txt", input);
  switch (format) {
    case CompressionFormat.BASE64:
      return await zipFile.generateAsync({ type: "base64" });
    case CompressionFormat.BYTE_ARRAY:
      return await uInt8ArrayToString(
        await zipFile.generateAsync({ type: "uint8array" })
      );
  }
}

export async function decompress(options: CompressionOptions): Promise<string> {
  const { algorithm = CompressionAlgorithm.LZ_STRING } = options;
  switch (algorithm) {
    case CompressionAlgorithm.LZ_STRING:
      return decompressLZString(options);
    case CompressionAlgorithm.ZLIB:
      return decompressZlib(options);
    case CompressionAlgorithm.ZIP:
      return decompressZip(options);
  }
}

async function decompressLZString(
  options: CompressionOptions
): Promise<string> {
  const { input, format } = options;
  switch (format) {
    case CompressionFormat.BASE64:
      return lzString.decompressFromEncodedURIComponent(input) ?? "";
    case CompressionFormat.BYTE_ARRAY:
      return (
        lzString.decompressFromUint8Array(await stringToUInt8Array(input)) ?? ""
      );
  }
}

async function decompressZlib(options: CompressionOptions): Promise<string> {
  const { input, format } = options;
  switch (format) {
    case CompressionFormat.BASE64:
      return pako.inflate(toByteArray(input), { to: "string" });
    case CompressionFormat.BYTE_ARRAY:
      return pako.inflate(await stringToUInt8Array(input), { to: "string" });
  }
}

async function decompressZip(options: CompressionOptions): Promise<string> {
  const { input, format } = options;
  const baseZipFile = new JSZip();

  switch (format) {
    case CompressionFormat.BASE64:
      return (
        (await (await baseZipFile.loadAsync(input, { base64: true }))
          ?.file("input.txt")
          ?.async("string")) ?? ""
      );
    case CompressionFormat.BYTE_ARRAY:
      return (
        (await (await baseZipFile.loadAsync(await stringToUInt8Array(input)))
          ?.file("input.txt")
          ?.async("string")) ?? ""
      );
  }
}

async function uInt8ArrayToString(uint8arr: Uint8Array): Promise<string> {
  return uint8arr.toString();
}

async function stringToUInt8Array(value: string): Promise<Uint8Array> {
  return Uint8Array.from(value.split(","), (i) => parseInt(i, 10));
}
