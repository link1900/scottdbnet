export interface BenchMark<DataSetupResult> {
  enabled: boolean;
  name: string;
  test: (dataSetupResult: DataSetupResult) => Promise<void>;
}
