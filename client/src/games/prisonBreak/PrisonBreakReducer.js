import isString from "lodash/isString";
import isEmpty from "lodash/isEmpty";
import { processCommand, newline } from "./commandProcessor";
import { createWorld } from "./World";

function initState() {
  const world = createWorld();

  return {
    log: [],
    history: [],
    historyPosition: 0,
    currentInput: "",
    prompt: null,
    world
  };
}

export const ACTION_TYPES = {
  INPUT_CHANGED: "INPUT_CHANGED",
  KEY_PRESSED: "KEY_PRESSED",
  COMMAND_SELECTED: "COMMAND_SELECTED"
};

export function createActionInputChanged(value) {
  return {
    type: ACTION_TYPES.INPUT_CHANGED,
    value
  };
}

export function createActionKeyPressed(key) {
  return {
    type: ACTION_TYPES.KEY_PRESSED,
    key
  };
}

export function createActionCommandSelected(command) {
  return {
    type: ACTION_TYPES.COMMAND_SELECTED,
    command
  };
}

function handleInputChanged(state, value) {
  return {
    ...state,
    currentInput: value
  };
}

function handleKeyPressed(state, key) {
  if (key === "ArrowUp") {
    const newHistoryPosition = state.historyPosition - 1;
    if (newHistoryPosition < 0) {
      return state;
    }
    return {
      ...state,
      currentInput: state.history[newHistoryPosition],
      historyPosition: newHistoryPosition
    };
  }
  if (key === "ArrowDown") {
    const newHistoryPosition = state.historyPosition + 1;
    if (newHistoryPosition > state.history.length - 1) {
      return {
        ...state,
        currentInput: "",
        historyPosition: state.history.length
      };
    }
    return {
      ...state,
      currentInput: state.history[newHistoryPosition],
      historyPosition: newHistoryPosition
    };
  }
  if (key === "Enter") {
    return runCommand(state, state.currentInput);
  }
  return state;
}

function runCommand(state, command) {
  if (!isString(command) || isEmpty(command)) {
    return newline(state);
  }
  command = command.trim().toLowerCase();

  if (state.prompt) {
    return processCommand(state, command, ["yes", "no"]);
  }

  return processCommand(state, command);
}

export function handleCommandSelected(state, command) {
  return runCommand(state, command);
}

export function PrisonBreakRootReducer(state = initState(), action) {
  if (action.type === ACTION_TYPES.INPUT_CHANGED) {
    return handleInputChanged(state, action.value);
  }
  if (action.type === ACTION_TYPES.KEY_PRESSED) {
    return handleKeyPressed(state, action.key);
  }
  if (action.type === ACTION_TYPES.COMMAND_SELECTED) {
    return handleCommandSelected(state, action.command);
  }
  return state;
}
