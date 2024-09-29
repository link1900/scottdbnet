import { BenchMark } from "./BenchMark";
import { DataSet } from "./DataSet";

export interface BenchMarkSuite<DataSetupResult> {
  name: string;
  logger: (output: string) => void;
  dataSets: DataSet<DataSetupResult>[];
  benchMarks: BenchMark<DataSetupResult>[];
}
