import {
  CompressionAlgorithm,
  CompressionFormat,
  CompressionOptions,
  CompressionResult,
  CompressorOperations
} from "../../util/compressorHelper";
import { SampleGeneratorOptions, SampleType } from "../../util/sampleHelper";
import { BenchMarkSuite } from "./BenchMarkSuite";

export function getCompressionBenchMarkSuite(
  logger: (output: string) => void,
  generateSample: (input: SampleGeneratorOptions) => Promise<string>,
  runCompression: (input: CompressionOptions) => Promise<CompressionResult>
): BenchMarkSuite<string> {
  return {
    name: "compression",
    logger,
    benchMarks: [
      {
        enabled: true,
        name: "LZ_STRING base64 compression",
        test: async (dataSetupResult: string) => {
          await runCompression({
            input: dataSetupResult,
            operation: CompressorOperations.COMPRESS,
            algorithm: CompressionAlgorithm.LZ_STRING,
            format: CompressionFormat.BASE64
          });
        }
      },
      {
        enabled: true,
        name: "LZ_STRING byte array compression",
        test: async (dataSetupResult: string) => {
          await runCompression({
            input: dataSetupResult,
            operation: CompressorOperations.COMPRESS,
            algorithm: CompressionAlgorithm.LZ_STRING,
            format: CompressionFormat.BYTE_ARRAY
          });
        }
      }
    ],
    dataSets: [
      {
        enabled: false,
        name: "1 KB JSON",
        setup: async () => {
          return generateSample({
            type: SampleType.JSON,
            sizeInBytes: 1000
          });
        }
      },
      {
        enabled: true,
        name: "1 MB JSON",
        setup: async () => {
          return generateSample({
            type: SampleType.JSON,
            sizeInBytes: 1000000
          });
        }
      },
      {
        enabled: true,
        name: "10 MB JSON",
        setup: async () => {
          return generateSample({
            type: SampleType.JSON,
            sizeInBytes: 10000000
          });
        }
      },
      {
        enabled: false,
        name: "30 MB JSON",
        setup: async () => {
          return generateSample({
            type: SampleType.JSON,
            sizeInBytes: 30000000
          });
        }
      },
      {
        enabled: false,
        name: "100 MB JSON",
        setup: async () => {
          return generateSample({
            type: SampleType.JSON,
            sizeInBytes: 100000000
          });
        }
      },
      {
        enabled: false,
        name: "1 GB JSON",
        setup: async () => {
          return generateSample({
            type: SampleType.JSON,
            sizeInBytes: 1000000000
          });
        }
      }
    ]
  };
}

export async function noOp() {
  return;
}
