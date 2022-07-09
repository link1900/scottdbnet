import { ListRandomizer } from "./listRandomizer/ListRandomizer";
import { Compressor } from "./compressor/Compressor";

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
  }
];
