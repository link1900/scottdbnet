import { lazy } from "react";

export interface ToolDefinition {
  name: string;
  title: string;
  desc?: string;
  component?: any;
}

export const toolDefinitions: ToolDefinition[] = [
  {
    name: "listRandomizer",
    title: "List Randomizer",
    component: lazy(() => import("./listRandomizer/ListRandomizer"))
  },
  {
    name: "randomJoke",
    title: "Random Joke",
    component: lazy(() => import("./randomJoke/RandomJoke"))
  },
  {
    name: "compressor",
    title: "Compressor",
    component: lazy(() => import("./compressor/Compressor"))
  },
  {
    name: "encoder",
    title: "Encoder",
    component: lazy(() => import("./encoder/Encoder"))
  },
  {
    name: "sample",
    title: "Sample Generator",
    component: lazy(() => import("./sampleGenerator/SampleGenerator"))
  },
  {
    name: "benchMarker",
    title: "Bench Marker",
    component: lazy(() => import("./benchMarker/BenchMarker"))
  }
];
