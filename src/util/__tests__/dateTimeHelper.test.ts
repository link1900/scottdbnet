import {
  convertMillisecondsToString,
  getBenchmarkEndTimeString,
  getBenchmarkStartTime,
  getPerformanceMeasure
} from "../dateTimeHelper";

describe("getBenchmarkStartTime()", () => {
  it("gets start time mark", () => {
    const result = getBenchmarkStartTime();
    expect(result).toBeTruthy();
  });
});

describe("getPerformanceMeasure()", () => {
  it("gets a performance measure", () => {
    const startMark = getBenchmarkStartTime();
    const result = getPerformanceMeasure(startMark);
    expect(result.start).toBeTruthy();
    expect(result.end).toBeTruthy();
    expect(result.millisecondsDifference).toBeTruthy();
  });
});

describe("convertMillisecondsToString()", () => {
  it("gets a minute in from milliseconds", () => {
    expect(convertMillisecondsToString(86424)).toEqual("1m 26.4s");
  });

  it("converts a millisecond value to human readable format", () => {
    expect(convertMillisecondsToString(56160000)).toEqual("15h 36m");
  });

  it("converts a small millisecond value to human readable format", () => {
    expect(convertMillisecondsToString(435)).toEqual("435ms");
  });
});

describe("getBenchmarkEndTimeString()", () => {
  it("converts a start mark to string", () => {
    const startMark = getBenchmarkStartTime();
    expect(getBenchmarkEndTimeString(startMark)).toBeTruthy();
  });
});
