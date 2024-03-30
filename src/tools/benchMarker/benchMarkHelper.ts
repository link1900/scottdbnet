import { groupBy } from "lodash";
import {
  getBenchmarkStartTime,
  getPerformanceMeasure
} from "../../util/dateTimeHelper";
import { BenchMark } from "./BenchMark";
import { BenchMarkResult } from "./BenchMarkResult";
import { BenchMarkSuite } from "./BenchMarkSuite";
import { DataSet } from "./DataSet";

export async function runBenchMarkSuite<BenchMarkSetupResult, DataSetupResult>(
  benchMarkSuite: BenchMarkSuite<BenchMarkSetupResult, DataSetupResult>
): Promise<void> {
  benchMarkSuite.logger(
    `starting running bench mark suite "${benchMarkSuite.name}"`
  );
  const { benchMarks, dataSets } = benchMarkSuite;
  const results = await runBenchMarks(benchMarkSuite, benchMarks, dataSets);
  benchMarkSuite.logger("");
  benchMarkSuite.logger("### results ###");
  const dataSetGroups = groupBy(results, "dataSet");
  Object.entries(dataSetGroups).forEach(([key, dataSetGroup]) => {
    benchMarkSuite.logger(`## data set ${key} ##`);
    reportBenchMarkResults(benchMarkSuite, dataSetGroup);
    benchMarkSuite.logger("");
  });
  benchMarkSuite.logger(
    `finished running bench mark suite "${benchMarkSuite.name}"`
  );
}

export async function runBenchMarks<BenchMarkSetupResult, DataSetupResult>(
  benchMarkSuite: BenchMarkSuite<BenchMarkSetupResult, DataSetupResult>,
  benchMarks: BenchMark<BenchMarkSetupResult, DataSetupResult>[],
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

export async function runBenchMark<BenchMarkSetupResult, DataSetupResult>(
  benchMarkSuite: BenchMarkSuite<BenchMarkSetupResult, DataSetupResult>,
  benchMark: BenchMark<BenchMarkSetupResult, DataSetupResult>,
  dataSet: DataSet<DataSetupResult>
): Promise<BenchMarkResult | null> {
  if (!benchMark.enabled || !dataSet.enabled) {
    return null;
  }
  benchMarkSuite.logger(
    `started running bench mark "${benchMark.name}" with data set "${dataSet.name}"`
  );
  const benchMarkSetupResult = await benchMark.setup();
  const dataSetupResult = await dataSet.setup();
  const startTime = getBenchmarkStartTime();
  await benchMark.test(benchMarkSetupResult, dataSetupResult);
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
  return (
    a.performance.millisecondsDifference - b.performance.millisecondsDifference
  );
}

export function reportBenchMarkResults<BenchMarkSetupResult, DataSetupResult>(
  benchMarkSuite: BenchMarkSuite<BenchMarkSetupResult, DataSetupResult>,
  results: BenchMarkResult[]
): void {
  const sortedResults = results.sort(sortBenchMarkResult);
  sortedResults.forEach((r) => {
    benchMarkSuite.logger(`${r.name} = ${r.performance.displayDifference}`);
  });
}
