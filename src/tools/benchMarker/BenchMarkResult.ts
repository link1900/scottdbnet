import { PerformanceMeasure } from "../../util/dateTimeHelper";

export interface BenchMarkResult {
  name: string;
  dataSet: string;
  status: "pending" | "running" | "completed" | "failed";
  performance: PerformanceMeasure;
}
