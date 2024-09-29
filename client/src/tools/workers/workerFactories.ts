export function createCompressorWorker(
  name: string = "compressorWorker"
): Worker {
  return new Worker(new URL("./compressorWorker.ts", import.meta.url), {
    name
  });
}

export function createSampleWorker(name: string = "sampleWorker"): Worker {
  return new Worker(new URL("./sampleWorker.ts", import.meta.url), {
    name
  });
}
