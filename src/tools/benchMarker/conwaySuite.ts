import { ConwayArray } from "../../games/gameOfLife/ConwayArray";
import { ConwayGameOfLifeBitArray } from "../../games/gameOfLife/ConwayBitArray";
import { ConwaySetArray } from "../../games/gameOfLife/ConwaySetArray";
import { ConwayWorld } from "../../games/gameOfLife/ConwayWorld";
import { BenchMarkSuite } from "./BenchMarkSuite";

export interface ConwayOptions {
  steps: number;
  world?: ConwayWorld;
  arrayWorld?: ConwayArray;
  bitArrayWorld?: ConwayGameOfLifeBitArray;
  setArrayWorld?: ConwaySetArray;
}

export function getConwayBenchMarkSuite(
  logger: (output: string) => void,
  canvas: HTMLCanvasElement
): BenchMarkSuite<ConwayOptions> {
  return {
    name: "conway",
    logger,
    benchMarks: [
      {
        enabled: false,
        name: "cell objects",
        test: runConwayWorld
      },
      {
        enabled: true,
        name: "UInt8Array",
        test: runConwayArray
      },
      {
        enabled: false,
        name: "UInt32Array Bits",
        test: runConwayBitArray
      },
      {
        enabled: false,
        name: "Set",
        test: runConwaySetArray
      }
    ],
    dataSets: [
      {
        enabled: false,
        name: "10,000 cells over 100 steps",
        setup: async () => {
          return setupConwayOptions(canvas, 10000, 100);
        }
      },
      {
        enabled: true,
        name: "10,000 cells over 3000 steps",
        setup: async () => {
          return setupConwayOptions(canvas, 10000, 3000);
        }
      },
      {
        enabled: true,
        name: "40,000 cells over 3000 steps",
        setup: async () => {
          return setupConwayOptions(canvas, 40000, 3000);
        }
      }
    ]
  };
}

export function setupConwayOptions(
  canvas: HTMLCanvasElement,
  size: number,
  steps: number
): ConwayOptions {
  const gridSize = Math.sqrt(size);
  const world = new ConwayWorld({
    canvas,
    height: 600,
    width: 600,
    gridSize,
    boundType: "wrap",
    cellBorder: false,
    framesPerSecond: 15
  });

  const arrayWorld = new ConwayArray(gridSize, gridSize);
  const bitArrayWorld = new ConwayGameOfLifeBitArray(gridSize, gridSize);
  const setArrayWorld = new ConwaySetArray(gridSize, gridSize);
  return {
    steps,
    world,
    arrayWorld,
    bitArrayWorld,
    setArrayWorld
  };
}

export async function runConwayWorld(options: ConwayOptions) {
  const { world, steps } = options;
  if (!world) {
    return;
  }
  for (let i = 0; i < steps; i++) {
    world.simulate();
  }
}

export async function runConwayArray(options: ConwayOptions) {
  const { arrayWorld, steps } = options;
  if (!arrayWorld) {
    return;
  }
  for (let i = 0; i < steps; i++) {
    arrayWorld.calculateNextState();
  }
}

export async function runConwayBitArray(options: ConwayOptions) {
  const { bitArrayWorld, steps } = options;
  if (!bitArrayWorld) {
    return;
  }
  for (let i = 0; i < steps; i++) {
    bitArrayWorld.calculateNextState();
  }
}

export async function runConwaySetArray(options: ConwayOptions) {
  const { setArrayWorld, steps } = options;
  if (!setArrayWorld) {
    return;
  }
  for (let i = 0; i < steps; i++) {
    setArrayWorld.calculateNextState();
  }
}
