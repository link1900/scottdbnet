import prettyMilliseconds from "pretty-ms";

export interface PerformanceMeasure {
  start: DOMHighResTimeStamp;
  end: DOMHighResTimeStamp;
  millisecondsDifference: number;
  displayDifference: string;
}

export function getBenchmarkStartTime(): DOMHighResTimeStamp {
  return performance.now();
}

export function getPerformanceMeasure(
  start: DOMHighResTimeStamp
): PerformanceMeasure {
  const end = performance.now();
  const millisecondsDifference = end - start;
  return {
    start,
    end,
    millisecondsDifference,
    displayDifference: convertMillisecondsToString(millisecondsDifference)
  };
}

export function convertMillisecondsToString(milliseconds: number): string {
  return prettyMilliseconds(milliseconds);
}

export function getBenchmarkEndTimeString(start: DOMHighResTimeStamp) {
  const performanceMeasures = getPerformanceMeasure(start);
  return convertMillisecondsToString(
    performanceMeasures.millisecondsDifference
  );
}
