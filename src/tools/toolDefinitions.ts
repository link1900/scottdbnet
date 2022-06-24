import { ListRandomizer } from "./listRandomizer/ListRandomizer";

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
  }
];
