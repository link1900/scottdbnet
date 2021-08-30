import React from "react";
import { connect } from "react-redux";
import { createActionCommandSelected } from "./PrisonBreakReducer";
import "./commandLine.css";

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    onClick: command => {
      dispatch(createActionCommandSelected(command));
    }
  };
};

const CommandRef = props => {
  const { command, onClick, label } = props;
  const displayName = label || command;
  return (
    <span
      className="commandRef"
      role="presentation"
      onClick={() => {
        onClick(command);
      }}
    >
      {displayName}
    </span>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CommandRef);
