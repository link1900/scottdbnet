import {
  base64DecodeString,
  base64EncodeString,
  compress,
  CompressionFormat,
  decompress,
  formatBytes,
  getStringSizeInBytes
} from "../stringHelper";

describe("base64EncodeString()", () => {
  it("encodes correctly", () => {
    const text = "someType|90543609845670834";
    const expected = "c29tZVR5cGV8OTA1NDM2MDk4NDU2NzA4MzQ=";
    expect(base64EncodeString(text)).toEqual(expected);
  });

  it("can base64 encode a piece of text", () => {
    const input = "Hello World";
    const expected = "SGVsbG8gV29ybGQ=";
    expect(base64EncodeString(input)).toEqual(expected);
  });

  it("can base64 encode null", () => {
    const input = null;
    expect(base64EncodeString(input)).toEqual("");
  });

  it("can base64 encode undefined", () => {
    const input = undefined;
    expect(base64EncodeString(input)).toEqual("");
  });
});

describe("base64DecodeString()", () => {
  it("decodes correctly", () => {
    const text = "c29tZVR5cGV8OTA1NDM2MDk4NDU2NzA4MzQ=";
    const expected = "someType|90543609845670834";
    expect(base64DecodeString(text)).toEqual(expected);
  });

  it("can base64 decode a piece of text", () => {
    const input = "SGVsbG8gV29ybGQ=";
    const expected = "Hello World";
    expect(base64DecodeString(input)).toEqual(expected);
  });

  it("can base64 encode null", () => {
    const input = null;
    expect(base64DecodeString(input)).toEqual("");
  });

  it("can base64 encode undefined", () => {
    const input = undefined;
    expect(base64DecodeString(input)).toEqual("");
  });
});

describe("formatBytes()", () => {
  it("gives format in MB", async () => {
    const result = formatBytes(152562384);
    expect(result).toEqual("153 MB");
  });
});

describe("getStringSizeInBytes()", () => {
  it("gets string bytes", async () => {
    expect(getStringSizeInBytes("This is a string\n")).toEqual(17);
  });

  it("gets string bytes for emoji", async () => {
    expect(getStringSizeInBytes("😂👍")).toEqual(8);
  });
});

describe("compress()", () => {
  it("compresses the string using default options", async () => {
    const result = compress("this is a string");
    expect(result).toEqual("C4CwlgzgBJUIZQsATmAdgcyA");
  });

  it("compresses the string for base64", async () => {
    const result = compress("this is a string", {
      format: CompressionFormat.BASE64
    });
    expect(result).toEqual("C4CwlgzgBJUIZQsATmAdgcyA");
  });

  it("compresses the string for base64 encoded", async () => {
    const result = compress("this is a string", {
      format: CompressionFormat.BASE64_ENCODED
    });
    expect(result).toEqual("C4CwlgzgBJUIZQsATmAdgcyA");
  });

  it("compresses the string for UTF16", async () => {
    const result = compress("this is a string", {
      format: CompressionFormat.UTF16
    });
    expect(result).toEqual("஀낖ೠҕࡥ଀习ᶁ첀");
  });

  it("compresses the string for UTF16 safe", async () => {
    const result = compress("this is a string", {
      format: CompressionFormat.UTF16_SAFE
    });
    expect(result).toEqual("נⱅ䆼i⡣ᑌ¼怽䄆† ");
  });
});

describe("decompress()", () => {
  it("compresses the string using default options", async () => {
    const result = decompress("C4CwlgzgBJUIZQsATmAdgcyA");
    expect(result).toEqual("this is a string");
  });

  it("compresses the string for base64", async () => {
    const result = decompress("C4CwlgzgBJUIZQsATmAdgcyA", {
      format: CompressionFormat.BASE64
    });
    expect(result).toEqual("this is a string");
  });

  it("compresses the string for base64 encoded", async () => {
    const result = decompress("C4CwlgzgBJUIZQsATmAdgcyA", {
      format: CompressionFormat.BASE64_ENCODED
    });
    expect(result).toEqual("this is a string");
  });

  it("compresses the string for UTF16", async () => {
    const result = decompress("஀낖ೠҕࡥ଀习ᶁ첀", {
      format: CompressionFormat.UTF16
    });
    expect(result).toEqual("this is a string");
  });

  it("compresses the string for UTF16 safe", async () => {
    const result = decompress("נⱅ䆼i⡣ᑌ¼怽䄆† ", {
      format: CompressionFormat.UTF16_SAFE
    });
    expect(result).toEqual("this is a string");
  });
});
