/* eslint-disable no-restricted-globals */

import {
  sampleGenerator,
  SampleGeneratorOptions
} from "../../util/sampleHelper";

onmessage = (e: MessageEvent<SampleGeneratorOptions>) => {
  const res = sampleGenerator(e.data);
  self.postMessage(res);
};

export {};
