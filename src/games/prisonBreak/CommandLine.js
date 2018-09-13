import React from 'react';
import { TextField } from '@material-ui/core';
import './commandLine.css';

export default class CommandLine extends React.Component {
    componentDidUpdate() {
        const mainTextArea = document.getElementById('main-text-area');
        if (mainTextArea) {
            mainTextArea.scrollTop = mainTextArea.scrollHeight;
        }
    }

    mainCommandInput = null;

    clickConsole = () => {
        if (this.mainCommandInput) {
            this.mainCommandInput.focus();
        }
    };

    handleInputRef = ref => {
        this.mainCommandInput = ref;
    };

    render() {
        const { name = 'bash', currentInput = '', onChange = () => {}, onKeyDown = () => {}, log = [] } = this.props;
        return (
            <div style={{ width: '600px' }} role="presentation" onClick={this.clickConsole} className="shell-wrap">
                <p className="shell-top-bar">{name}</p>
                <div
                    id="main-text-area"
                    className="shell-body"
                    style={{
                        minHeight: '200px',
                        overflowY: 'scroll',
                        maxHeight: '500px'
                    }}
                >
                    {log.map((logItem, index) => {
                        const key = `${index}-${logItem}`;
                        return (
                            <div className="log" key={key}>
                                $ {logItem}
                            </div>
                        );
                    })}
                    <span className="log">$ </span>
                    <TextField
                        id="main-command-input"
                        autoFocus
                        maxLength={60}
                        inputRef={this.handleInputRef}
                        InputProps={{
                            disableUnderline: true,
                            style: {
                                padding: 0,
                                width: '95%',
                                marginTop: 3,
                                height: 'inherit',
                                lineHeight: 'inherit'
                            }
                        }}
                        inputProps={{
                            style: {
                                background: '#00000',
                                color: 'rgb(199, 197,189)',
                                font: "14px 'Roboto Mono', monospace"
                            }
                        }}
                        value={currentInput}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                    />
                </div>
            </div>
        );
    }
}
