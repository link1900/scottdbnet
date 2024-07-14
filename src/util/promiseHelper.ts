export function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export function makeCancelable<T, U extends any[]>(
  promiseFunc: (...args: U) => Promise<T>
) {
  let hasCanceled = false;
  let resolvePromise: any;

  const wrappedPromise = (...args: U) =>
    new Promise<T>((resolve, reject) => {
      resolvePromise = resolve;
      promiseFunc(...args).then(
        (val) =>
          hasCanceled ? reject(new Error("promise cancelled")) : resolve(val),
        (error) =>
          hasCanceled ? reject(new Error("promise cancelled")) : reject(error)
      );
    });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled = true;
      resolvePromise();
    }
  };
}
