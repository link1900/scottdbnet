/* eslint-disable no-restricted-globals */

import {
  CompressionOptions,
  runCompressionOperation
} from "../../util/compressorHelper";

onmessage = (e: MessageEvent<CompressionOptions>) => {
  const res = runCompressionOperation(e.data);
  self.postMessage(res);
};

export {};
