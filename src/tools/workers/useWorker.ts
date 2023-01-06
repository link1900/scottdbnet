import { useCallback, useEffect, useRef } from "react";
import { WorkerFactory } from "./WorkerFactory";

type UseWorkerOptions = {
  workerFactory: WorkerFactory;
  name?: string;
};

type UseWorkerReturn<I, O> = {
  runWorker: (input: I) => Promise<O>;
  worker: Worker | undefined;
};

export function useWorker<InputType, ReturnType>(
  options: UseWorkerOptions
): UseWorkerReturn<InputType, ReturnType> {
  const { workerFactory, name } = options;
  const worker = useRef<Worker>();

  useEffect(() => {
    worker.current = workerFactory(name);
    return () => {
      worker.current?.terminate();
    };
  }, [workerFactory, name, worker]);

  const runWorker = useCallback(
    (input: InputType): Promise<ReturnType> => {
      return new Promise<ReturnType>((resolve, reject) => {
        if (!worker.current) {
          return reject(new Error(`worker ${name} has not been started`));
        }

        worker.current.onmessage = (event: MessageEvent<ReturnType>) => {
          resolve(event.data);
        };

        worker.current.onerror = (errorEvent) => {
          reject(errorEvent.error);
        };

        worker.current.postMessage(input);
      });
    },
    [name, worker]
  );

  return {
    runWorker,
    worker: worker.current
  };
}
