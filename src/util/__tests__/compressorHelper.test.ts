import {
  compress,
  CompressionAlgorithm,
  CompressionFormat,
  CompressionOptions,
  CompressorOperations,
  decompress
} from "../compressorHelper";

function getCompressorTestOptions(
  overrides?: Partial<CompressionOptions>
): CompressionOptions {
  return {
    input: "this is a string",
    operation: CompressorOperations.COMPRESS,
    algorithm: CompressionAlgorithm.LZ_STRING,
    format: CompressionFormat.BASE64,
    ...overrides
  };
}

function getDecompressorTestOptions(
  overrides?: Partial<CompressionOptions>
): CompressionOptions {
  return {
    input: "C4CwlgzgBJUIZQsATmAdgcyA",
    operation: CompressorOperations.DECOMPRESS,
    algorithm: CompressionAlgorithm.LZ_STRING,
    format: CompressionFormat.BASE64,
    ...overrides
  };
}

describe("compress()", () => {
  it("compresses the string using BASE64", async () => {
    const result = compress(
      getCompressorTestOptions({ input: "this is a string" })
    );
    expect(result).toEqual("C4CwlgzgBJUIZQsATmAdgcyA");
  });
});

describe("decompress()", () => {
  it("compresses the string using BASE64", async () => {
    const result = decompress(getDecompressorTestOptions());
    expect(result).toEqual("this is a string");
  });
});
