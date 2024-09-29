import { delay } from "../../util/promiseHelper";
import { SdbosCommand } from "./SdbosContext";

export const defaultCommands: SdbosCommand[] = [
  {
    command: "ls",
    description: "List files in the current directory",
    func: async (args, { context, addOutput }) => {
      addOutput(context.files.map((file) => file.name).join(" "));
      return 0;
    }
  },
  {
    command: "clear",
    description: "Clear the terminal",
    func: async (args, { updateContext }) => {
      updateContext({ log: [] });
      return 0;
    }
  },
  {
    command: "history",
    description: "List command history",
    func: async (args, { context, addOutput }) => {
      context.history.forEach((command, index) => {
        addOutput(`${index + 1} ${command}`);
      });
      return 0;
    }
  },
  {
    command: "wait",
    argDescription: "<seconds>",
    description: "Wait for a specified number of seconds",
    func: async (args, { addOutput }) => {
      await delay(parseInt(args[0], 10) * 1000);
      addOutput(`Waited for ${args[0]} seconds`);
      return 0;
    }
  },
  {
    command: "help",
    description: "List available commands",
    func: async (args, { context, addOutput }) => {
      context.commands.forEach((command) => {
        addOutput(
          `${command.command} ${command.argDescription ?? ""} - ${
            command.description ?? ""
          }`
        );
      });
      return 0;
    }
  }
];
