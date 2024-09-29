import React, { KeyboardEventHandler, useEffect, useRef } from "react";
import { TextField } from "@material-ui/core";
import "./commandLine.css";

interface Props {
  name?: string;
  width?: number;
  height?: number;
  location?: string;
  allowInput?: boolean;
  currentInput?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  log?: string[];
}

export const CommandLine: React.FC<Props> = ({
  name = "bash",
  width = 640,
  height = 480,
  location = "$",
  allowInput = true,
  currentInput = "",
  onChange,
  onKeyDown,
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
    if (mainCommandInput.current && allowInput) {
      mainCommandInput.current.focus();
    }
  };

  return (
    <div
      style={{ width: `${width}px` }}
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
          overflowY: "auto",
          height: `${height}px`
        }}
      >
        {log.map((logItem, index) => {
          const key = `${index}-${logItem}`;
          return logItem.trim().length === 0 ? (
            <br key={key} />
          ) : (
            <div className="log" key={key}>
              {logItem}
            </div>
          );
        })}
        {allowInput ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              alignItems: "first baseline"
            }}
          >
            <span className="log">{location}</span>
            <TextField
              id="main-command-input"
              autoFocus
              fullWidth
              inputRef={mainCommandInput}
              InputProps={{
                disableUnderline: true,
                style: {
                  padding: 0,
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
        ) : null}
      </div>
    </div>
  );
};
