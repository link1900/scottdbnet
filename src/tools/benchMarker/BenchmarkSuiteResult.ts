import { Dictionary } from "lodash";
import { BenchMarkResult } from "./BenchMarkResult";
import { BenchMarkSuite } from "./BenchMarkSuite";

export type BenchmarkSuiteResult<BenchMarkSetupResult, DataSetupResult> = {
  suite: BenchMarkSuite<BenchMarkSetupResult, DataSetupResult>;
  results: BenchMarkResult[];
  groupedResults: Dictionary<BenchMarkResult[]>;
};
