import React from "react";
import { CommandLine } from "./CommandLine";
import { useCommands, useHistory, useLog } from "./SdbosHooks";

export interface CommandLineProps {
  name?: string;
  width?: number;
  height?: number;
  allowInput?: boolean;
}

export const SdbosCommandLine: React.FC<CommandLineProps> = ({
  name = "bash",
  width = 640,
  height = 480,
  allowInput = true
}) => {
  const [currentInput, setCurrentInput] = React.useState("");
  const { log, prompt } = useLog();
  const { currentProcess, processInput } = useCommands();
  const { history, historyPosition, updateHistoryPosition } = useHistory();

  const updateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(event.target.value);
  };

  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const key = event.key;

    if (key === "ArrowUp") {
      const newHistoryPosition = historyPosition - 1;
      if (newHistoryPosition < 0) {
        return;
      } else {
        updateHistoryPosition(newHistoryPosition);
        setCurrentInput(history[newHistoryPosition]);
        return;
      }
    }
    if (key === "ArrowDown") {
      const newHistoryPosition = historyPosition + 1;
      if (newHistoryPosition > history.length - 1) {
        setCurrentInput("");
        updateHistoryPosition(history.length);
        return;
      } else {
        setCurrentInput(history[newHistoryPosition]);
        updateHistoryPosition(newHistoryPosition);
        return;
      }
    }

    if (key === "Enter") {
      setCurrentInput("");
      processInput(currentInput);
      return;
    }
  };

  return (
    <CommandLine
      name={name}
      width={width}
      height={height}
      location={prompt}
      allowInput={allowInput && currentProcess === null}
      log={log}
      currentInput={currentInput}
      onChange={updateInput}
      onKeyDown={onKeyPress}
    />
  );
};
