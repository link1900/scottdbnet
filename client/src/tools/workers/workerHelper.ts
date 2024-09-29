/* eslint-disable no-restricted-globals */

import { WorkRequest } from "./WorkRequest";
import { WorkResponseStatus } from "./WorkResponseStatus";

export function workerOnMessageBuilder<InputType, OutputType>(
  handler: (input: InputType) => OutputType
): (e: MessageEvent<WorkRequest<InputType>>) => void {
  return (e: MessageEvent<WorkRequest<InputType>>) => {
    const { id, input } = e.data;
    try {
      const output = handler(input);
      self.postMessage({
        id,
        status: WorkResponseStatus.SUCCESS,
        output
      });
    } catch (error) {
      self.postMessage({
        id,
        status: WorkResponseStatus.ERROR,
        error: error
      });
    }
  };
}

export function workerOnMessageBuilderForPromise<InputType, OutputType>(
  handler: (input: InputType) => Promise<OutputType>
): (e: MessageEvent<WorkRequest<InputType>>) => void {
  return (e: MessageEvent<WorkRequest<InputType>>) => {
    const { id, input } = e.data;
    handler(input)
      .then((output: OutputType) => {
        self.postMessage({
          id,
          status: WorkResponseStatus.SUCCESS,
          output
        });
      })
      .catch((error) => {
        self.postMessage({
          id,
          status: WorkResponseStatus.ERROR,
          error: error
        });
      });
  };
}
