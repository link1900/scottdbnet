/* eslint-disable no-restricted-globals */

import { sampleGenerator } from "../../util/sampleHelper";
import { workerOnMessageBuilder } from "./workerHelper";

onmessage = workerOnMessageBuilder(sampleGenerator);

export {};
