import { Dictionary } from "lodash";
import { BenchMarkResult } from "./BenchMarkResult";
import { BenchMarkSuite } from "./BenchMarkSuite";

export type BenchmarkSuiteResult<DataSetupResult> = {
  suite: BenchMarkSuite<DataSetupResult>;
  results: BenchMarkResult[];
  groupedResults: Dictionary<BenchMarkResult[]>;
};
