export interface DataSet<DataSetupResult> {
  enabled: boolean;
  name: string;
  setup: () => Promise<DataSetupResult>;
}
