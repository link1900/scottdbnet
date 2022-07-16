import { ListRandomizer } from "./listRandomizer/ListRandomizer";
import { Compressor } from "./compressor/Compressor";
import { RandomJoke } from "./randomJoke/RandomJoke";

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
    component: ListRandomizer
  },
  {
    name: "compressor",
    title: "Compressor",
    component: Compressor
  },
  {
    name: "randomJoke",
    title: "Random Joke",
    component: RandomJoke
  }
];
