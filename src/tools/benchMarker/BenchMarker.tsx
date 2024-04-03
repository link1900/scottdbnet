import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
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
import { BenchmarkSuiteResult } from "./BenchmarkSuiteResult";
import { getCompressionBenchMarkSuite } from "./compressionSuite";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getConwayBenchMarkSuite } from "./conwaySuite";

function buildChartOptions(result: BenchmarkSuiteResult<any>) {
  const series = Object.entries(result.groupedResults).map(
    ([key, dataSetGroup]) => {
      return {
        name: key,
        data: dataSetGroup.map((result) => {
          return Math.round(result.performance.millisecondsDifference);
        })
      };
    }
  );

  return {
    chart: {
      type: "bar"
    },
    title: {
      text: "Benchmark Results"
    },
    xAxis: {
      categories: result.results.map((result) => result.name),
      title: {
        text: null
      },
      gridLineWidth: 1,
      lineWidth: 0
    },
    yAxis: {
      min: 0,
      title: {
        text: "Performance (ms)",
        align: "high"
      },
      labels: {
        overflow: "justify"
      },
      gridLineWidth: 0,
      tooltip: {
        valueSuffix: "ms"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          },
          groupPadding: 0.1
        }
      },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "top",
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor: "#FFFFFF",
        shadow: true
      }
    },
    series,
    credits: {
      enabled: false
    }
  };
}

export default function BenchMarker() {
  const [suite, setSuite] = useState<string>("compression");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [suiteResult, setSuiteResult] = useState<
    BenchmarkSuiteResult<any> | undefined
  >(undefined);
  const { addOutput } = useLog();
  const { addCommand, processInput } = useCommands();

  const runSuite = async (suiteName: string) => {
    if (suiteName === "compression") {
      const runResults = await runBenchMarkSuite(
        getCompressionBenchMarkSuite(addOutput, generateSample, runCompression)
      );
      setSuiteResult(runResults);
    }
    if (suiteName === "conway" && canvasRef.current !== null) {
      const runResults = await runBenchMarkSuite(
        getConwayBenchMarkSuite(addOutput, canvasRef.current)
      );
      setSuiteResult(runResults);
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
              <MenuItem value="conway">Conway</MenuItem>
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
        {suiteResult ? (
          <Row>
            <HighchartsReact
              highcharts={Highcharts}
              options={buildChartOptions(suiteResult)}
            />
          </Row>
        ) : null}
        {suiteResult ? (
          <Row>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Data Set</TableCell>
                    <TableCell>Test Name</TableCell>
                    <TableCell align="right">Performance (ms)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {suiteResult.results.map((result) => (
                    <TableRow key={result.name}>
                      <TableCell align="right">{result.dataSet}</TableCell>
                      <TableCell component="th" scope="row">
                        {result.name}
                      </TableCell>
                      <TableCell align="right">
                        {Math.round(result.performance.millisecondsDifference)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Row>
        ) : null}
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </Stack>
    </PageLayout>
  );
}
