/* eslint-disable no-restricted-globals */

import { runCompressionOperation } from "../../util/compressorHelper";
import { workerOnMessageBuilderForPromise } from "./workerHelper";

onmessage = workerOnMessageBuilderForPromise(runCompressionOperation);

export {};
