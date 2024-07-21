import { useContext } from "react";
import { SdbosCommand, SdbosContext, SdbosFile } from "./SdbosContext";

export const useWorkingDirectory = () => {
  const { context, updateContext } = useContext(SdbosContext);
  return {
    workingDirectory: context.workingDirectory,
    setWorkingDirectory: (workingDirectory: string) => {
      updateContext({ workingDirectory });
    }
  };
};

export const useLog = () => {
  const { context, setContext } = useContext(SdbosContext);
  return {
    log: context.log,
    prompt: context.prompt,
    addOutput: (output: string) => {
      setContext((prevState) => {
        return {
          ...prevState,
          log: [...prevState.log, output]
        };
      });
    },
    clear: () => {
      setContext((prevState) => {
        return {
          ...prevState,
          log: []
        };
      });
    }
  };
};

export const useHistory = () => {
  const { context, setContext } = useContext(SdbosContext);
  return {
    history: context.history,
    historyPosition: context.historyPosition,
    addHistory: (input: string) => {
      setContext((prevState) => {
        const newHistory = [...prevState.history, input];
        return {
          ...prevState,
          history: newHistory,
          historyPosition: newHistory.length
        };
      });
    },
    updateHistoryPosition: (historyPosition: number) => {
      setContext((prevState) => {
        return {
          ...prevState,
          historyPosition
        };
      });
    }
  };
};

export const useCommands = () => {
  const { context, setContext, updateContext } = useContext(SdbosContext);
  const { addHistory } = useHistory();
  const { addOutput } = useLog();

  return {
    commands: context.commands,
    currentProcess: context.currentProcess,
    addCommand: (command: SdbosCommand) => {
      setContext((prevState) => {
        return {
          ...prevState,
          commands: [...prevState.commands, command]
        };
      });
    },
    processInput: async (input: string) => {
      addHistory(input);
      const inputParts = input.split(" ");
      if (inputParts.length === 0) {
        return;
      }
      const args = inputParts.slice(1);
      const command = context.commands.find(
        (command) => command.command === inputParts[0]
      );
      if (command) {
        updateContext({ currentProcess: { name: inputParts[0] } });
        addOutput(`${context.prompt} ${input}`);
        try {
          await command.func(args, {
            context,
            setContext,
            updateContext,
            addOutput
          });
        } catch (e) {
          const processResult = 1;
          addOutput(
            `Process ${inputParts[0]} failed with code ${processResult}`
          );
        }
        updateContext({ currentProcess: null });
      } else {
        addOutput(`${context.prompt} ${input}`);
        addOutput(`${inputParts[0]}: command not found`);
      }
    }
  };
};

export const useFiles = () => {
  const { context, setContext } = useContext(SdbosContext);
  return {
    files: context.files,
    makeFile: (file: SdbosFile) => {
      setContext((prevState) => {
        return {
          ...prevState,
          files: [...prevState.files, file]
        };
      });
    }
  };
};
