import { BenchMark } from "./BenchMark";
import { DataSet } from "./DataSet";

export interface BenchMarkSuite<BenchMarkSetupResult, DataSetupResult> {
  name: string;
  logger: (output: string) => void;
  dataSets: DataSet<DataSetupResult>[];
  benchMarks: BenchMark<BenchMarkSetupResult, DataSetupResult>[];
}
