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
    name: "compressor",
    title: "Compressor",
    component: lazy(() => import("./compressor/Compressor"))
  },
  {
    name: "randomJoke",
    title: "Random Joke",
    component: lazy(() => import("./randomJoke/RandomJoke"))
  }
];
