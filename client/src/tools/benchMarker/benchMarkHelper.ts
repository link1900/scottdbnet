import { groupBy } from "lodash";
import {
  getBenchmarkStartTime,
  getPerformanceMeasure
} from "../../util/dateTimeHelper";
import { BenchMark } from "./BenchMark";
import { BenchMarkResult } from "./BenchMarkResult";
import { BenchMarkSuite } from "./BenchMarkSuite";
import { BenchmarkSuiteResult } from "./BenchmarkSuiteResult";
import { DataSet } from "./DataSet";

export async function runBenchMarkSuite<DataSetupResult>(
  benchMarkSuite: BenchMarkSuite<DataSetupResult>
): Promise<BenchmarkSuiteResult<DataSetupResult>> {
  benchMarkSuite.logger(
    `starting running bench mark suite "${benchMarkSuite.name}"`
  );
  const { benchMarks, dataSets } = benchMarkSuite;
  const results = await runBenchMarks(benchMarkSuite, benchMarks, dataSets);
  const sortedResults = results.sort(sortBenchMarkResult);
  const dataSetGroups = groupBy(results, "dataSet");
  const suiteResult: BenchmarkSuiteResult<DataSetupResult> = {
    suite: benchMarkSuite,
    results: sortedResults,
    groupedResults: dataSetGroups
  };
  reportBenchMarkResults(suiteResult);
  return suiteResult;
}

export async function runBenchMarks<DataSetupResult>(
  benchMarkSuite: BenchMarkSuite<DataSetupResult>,
  benchMarks: BenchMark<DataSetupResult>[],
  dataSets: DataSet<DataSetupResult>[]
): Promise<BenchMarkResult[]> {
  const results: BenchMarkResult[] = [];

  for (const benchMark of benchMarks) {
    for (const dataSet of dataSets) {
      const benchMarkResult = await runBenchMark(
        benchMarkSuite,
        benchMark,
        dataSet
      );
      if (benchMarkResult !== null) {
        results.push(benchMarkResult);
      }
    }
  }

  return results;
}

export async function runBenchMark<DataSetupResult>(
  benchMarkSuite: BenchMarkSuite<DataSetupResult>,
  benchMark: BenchMark<DataSetupResult>,
  dataSet: DataSet<DataSetupResult>
): Promise<BenchMarkResult | null> {
  if (!benchMark.enabled || !dataSet.enabled) {
    return null;
  }
  benchMarkSuite.logger(
    `started running bench mark "${benchMark.name}" with data set "${dataSet.name}"`
  );
  const dataSetupResult = await dataSet.setup();
  const startTime = getBenchmarkStartTime();
  await benchMark.test(dataSetupResult);
  const performance = getPerformanceMeasure(startTime);
  benchMarkSuite.logger(
    `finished running bench mark "${benchMark.name}" with data set "${dataSet.name}" in ${performance.displayDifference}`
  );
  return {
    name: benchMark.name,
    dataSet: dataSet.name,
    status: "completed",
    performance
  };
}

export function sortBenchMarkResult(
  a: BenchMarkResult,
  b: BenchMarkResult
): number {
  if (a.dataSet < b.dataSet) {
    return -1;
  }
  if (a.dataSet > b.dataSet) {
    return 1;
  }
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return (
    a.performance.millisecondsDifference - b.performance.millisecondsDifference
  );
}

export function reportBenchMarkResults<DataSetupResult>(
  result: BenchmarkSuiteResult<DataSetupResult>
): void {
  const logger = result.suite.logger;
  logger("");
  logger("### results ###");
  Object.entries(result.groupedResults).forEach(([key, dataSetGroup]) => {
    logger(`## data set ${key} ##`);
    reportBenchMarkDataSetResults(result.suite, dataSetGroup);
    logger("");
  });
  logger(`finished running bench mark suite "${result.suite.name}"`);
}

export function reportBenchMarkDataSetResults<DataSetupResult>(
  benchMarkSuite: BenchMarkSuite<DataSetupResult>,
  results: BenchMarkResult[]
): void {
  results.forEach((r) => {
    benchMarkSuite.logger(`${r.name} = ${r.performance.displayDifference}`);
  });
}
