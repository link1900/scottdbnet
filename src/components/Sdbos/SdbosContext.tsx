import React, {
  useState,
  createContext,
  useContext,
  SetStateAction
} from "react";
import { defaultCommands } from "./SdbosStandardCommands";

export interface SdbosFile {
  type: "directory" | "file";
  name: string;
  files: SdbosFile[];
  contents: string;
}

export interface SdbosProcess {
  name: string;
}

export interface SdbosCommandArgs {
  context: ISdbosContext;
  setContext: (context: SetStateAction<ISdbosContext>) => void;
  updateContext: (context: Partial<ISdbosContext>) => void;
  addOutput: (value: string) => void;
}

export interface SdbosCommand {
  command: string;
  argDescription?: string;
  description?: string;
  func: (args: string[], helpers: SdbosCommandArgs) => Promise<number>;
}

export interface ISdbosContext {
  prompt: string;
  workingDirectory: string;
  files: SdbosFile[];
  log: string[];
  commands: SdbosCommand[];
  history: string[];
  historyPosition: number;
  user: string;
  currentProcess: SdbosProcess | null;
}

export interface SdbosContextDefinition {
  context: ISdbosContext;

  setContext(context: SetStateAction<ISdbosContext>): void;

  updateContext(context: Partial<ISdbosContext>): void;
}

export const SdbosContext = createContext<SdbosContextDefinition>({
  context: {
    workingDirectory: "/",
    prompt: `user@scottdb.net:/$`,
    files: [],
    log: ["SDB-OS Shell"],
    commands: [],
    history: [],
    historyPosition: 0,
    user: "user",
    currentProcess: null
  },
  setContext: () => undefined,
  updateContext: () => undefined
});

export const useSdbosContext = (): SdbosContextDefinition =>
  useContext<SdbosContextDefinition>(SdbosContext);

export const SdbosContextProvider: React.FC = ({ children }) => {
  const [context, setContext] = useState<ISdbosContext>({
    workingDirectory: "/",
    prompt: `user@scottdb.net:/$`,
    files: [],
    log: ["SDB-OS Shell"],
    commands: defaultCommands,
    history: [],
    historyPosition: 0,
    user: "user",
    currentProcess: null
  });

  const updateContext = (nextContext: Partial<ISdbosContext>): void => {
    setContext((prevState) => {
      return {
        ...prevState,
        ...nextContext
      };
    });
  };

  return (
    <SdbosContext.Provider
      value={{
        context,
        setContext,
        updateContext
      }}
    >
      {children}
    </SdbosContext.Provider>
  );
};

const SdbosContextConsumer = SdbosContext.Consumer;
export { SdbosContextConsumer };
