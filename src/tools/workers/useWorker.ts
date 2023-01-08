import { useCallback, useEffect, useRef } from "react";
import { uuid } from "../../util/stringHelper";
import { WorkerFactory } from "./WorkerFactory";
import { WorkRequest } from "./WorkRequest";
import { WorkResponse } from "./WorkResponse";
import { WorkResponseStatus } from "./WorkResponseStatus";

type UseWorkerOptions = {
  workerFactory: WorkerFactory;
  name?: string;
};

type UseWorkerReturn<InputType, OutputType> = {
  runWorker: (input: InputType) => Promise<OutputType>;
  worker: Worker | undefined;
};

export function useWorker<InputType, OutputType>(
  options: UseWorkerOptions
): UseWorkerReturn<InputType, OutputType> {
  const { workerFactory, name } = options;
  const worker = useRef<Worker>();

  useEffect(() => {
    worker.current = workerFactory(name);
    return () => {
      worker.current?.terminate();
    };
  }, [workerFactory, name, worker]);

  const runWorker = useCallback(
    (input: InputType): Promise<OutputType> => {
      return new Promise<OutputType>((resolve, reject) => {
        if (!worker.current) {
          return reject(new Error(`worker ${name} has not been started`));
        }

        const requestId = uuid();

        worker.current.onmessage = (
          event: MessageEvent<WorkResponse<OutputType>>
        ) => {
          if (event.data.id === requestId) {
            if (event.data.status === WorkResponseStatus.ERROR) {
              reject(event.data.error);
            } else {
              if (!event.data.output) {
                reject(
                  new Error(
                    "worker did not return output for successful response"
                  )
                );
              } else {
                resolve(event.data.output);
              }
            }
          }
        };

        worker.current.onerror = (errorEvent) => {
          reject(errorEvent.error);
        };

        worker.current.onmessageerror = () => {
          reject(new Error("provided message was invalid"));
        };

        const workRequest: WorkRequest<InputType> = {
          id: requestId,
          input
        };

        worker.current.postMessage(workRequest);
      });
    },
    [name, worker]
  );

  return {
    runWorker,
    worker: worker.current
  };
}
