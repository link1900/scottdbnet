import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from "@material-ui/core";
import { PageLayout } from "../../components/PageLayout";
import { Row } from "../../components/Row";
import { SdbosCommandLine } from "../../components/Sdbos/SdbosCommandLine";
import { useCommands, useLog } from "../../components/Sdbos/SdbosHooks";
import { Stack } from "../../components/Stack";
import {
  CompressionOptions,
  CompressionResult
} from "../../util/compressorHelper";
import { SampleGeneratorOptions } from "../../util/sampleHelper";
import { useWorker } from "../workers/useWorker";
import {
  createCompressorWorker,
  createSampleWorker
} from "../workers/workerFactories";
import { runBenchMarkSuite } from "./benchMarkHelper";
import { getCompressionBenchMarkSuite } from "./compressionSuite";

export default function BenchMarker() {
  const [suite, setSuite] = useState<string>("compression");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const { addOutput } = useLog();
  const { addCommand, processInput } = useCommands();

  const runSuite = async (suiteName: string) => {
    if (suiteName === "compression") {
      await runBenchMarkSuite(
        getCompressionBenchMarkSuite(addOutput, generateSample, runCompression)
      );
    }
  };

  const { runWorker: runCompression } = useWorker<
    CompressionOptions,
    CompressionResult
  >({
    workerFactory: createCompressorWorker
  });

  const { runWorker: generateSample } = useWorker<
    SampleGeneratorOptions,
    string
  >({
    workerFactory: createSampleWorker
  });

  const handleStart = async () => {
    await processInput(`benchmark ${suite}`);
  };

  const handleSuiteChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedValue = event.target.value;
    setSuite(selectedValue as string);
  };

  useEffect(() => {
    addCommand({
      command: "benchmark",
      argDescription: "<suite>",
      description: "Runs a benchmark suite",
      func: async (args, { addOutput }) => {
        if (args.length > 0) {
          setIsRunning(true);
          await runSuite(args[0]);
          setIsRunning(false);
        }

        return 0;
      }
    });
  }, []);

  return (
    <PageLayout title="BenchMarker" xs={12} sm={8}>
      <Stack align="center">
        <Row align="center">
          <FormControl variant="outlined">
            <InputLabel id="format-select-outlined-label">Suite</InputLabel>
            <Select
              labelId="format-select-outlined-label"
              id="format-select-outlined"
              value={suite}
              onChange={handleSuiteChange}
              label="Format"
            >
              <MenuItem value="compression">Compression</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleStart()}
            disabled={isRunning}
          >
            Start
          </Button>
        </Row>
        <Row>
          <SdbosCommandLine name="Bench Mark" width={800} height={480} />
        </Row>
      </Stack>
    </PageLayout>
  );
}
