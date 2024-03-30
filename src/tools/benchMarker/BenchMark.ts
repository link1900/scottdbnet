export interface BenchMark<BenchMarkSetupResult, DataSetupResult> {
  enabled: boolean;
  name: string;
  test: (
    setupResult: BenchMarkSetupResult,
    dataSetupResult: DataSetupResult
  ) => Promise<void>;
  setup: () => Promise<BenchMarkSetupResult>;
}
