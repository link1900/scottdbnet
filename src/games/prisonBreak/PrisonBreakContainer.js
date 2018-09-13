import { connect } from 'react-redux';
import CommandLine from './CommandLine';
import { createActionInputChanged, createActionKeyPressed } from './PrisonBreakReducer';
import { logViewProcessor } from './commandProcessor';

const mapStateToProps = state => {
    const log = state.log.map(logItem => logViewProcessor(logItem));
    return {
        log,
        currentInput: state.currentInput
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onChange: event => {
            dispatch(createActionInputChanged(event.target.value));
        },
        onKeyDown: event => {
            dispatch(createActionKeyPressed(event.key));
        }
    };
};

const CommandLineContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CommandLine);

export default CommandLineContainer;
