import React, { useEffect, useRef } from "react";
import { TextField } from "@material-ui/core";
import "./commandLine.css";

interface Props {
  name?: string;
  location?: string;
  currentInput?: string;
  onChange?: () => void;
  onKeyDown?: () => void;
  log?: string[];
}

export const CommandLine: React.FC<Props> = ({
  name = "bash",
  location = "$",
  currentInput = "",
  onChange = () => {},
  onKeyDown = () => {},
  log = []
}) => {
  const mainCommandInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const mainTextArea = document.getElementById("main-text-area");
    if (mainTextArea) {
      mainTextArea.scrollTop = mainTextArea.scrollHeight;
    }
  });

  const clickConsole = () => {
    if (mainCommandInput.current) {
      mainCommandInput.current.focus();
    }
  };

  return (
    <div
      style={{ width: "600px" }}
      role="presentation"
      onClick={clickConsole}
      className="shell-wrap"
    >
      <p className="shell-top-bar">{name}</p>
      <div
        id="main-text-area"
        className="shell-body"
        style={{
          minHeight: "200px",
          overflowY: "scroll",
          maxHeight: "500px"
        }}
      >
        {log.map((logItem, index) => {
          const key = `${index}-${logItem}`;
          return (
            <div className="log" key={key}>
              {logItem}
            </div>
          );
        })}
        <span className="log">{location} </span>
        <TextField
          id="main-command-input"
          autoFocus
          inputRef={mainCommandInput}
          InputProps={{
            disableUnderline: true,
            style: {
              padding: 0,
              width: "95%",
              marginTop: 0,
              height: "inherit",
              lineHeight: "inherit"
            }
          }}
          inputProps={{
            style: {
              background: "#00000",
              color: "rgb(199, 197,189)",
              font: "14px 'Roboto Mono', monospace",
              padding: 0
            }
          }}
          value={currentInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      </div>
    </div>
  );
};
