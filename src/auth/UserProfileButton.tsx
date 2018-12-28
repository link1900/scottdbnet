import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { Button } from '@material-ui/core';
import { FlatLink } from '../UI/FlatLink';
import { getViewerFromAuth, Viewer } from './authHelper';
import { RouteComponentProps, withRouter } from 'react-router';

interface Props extends RouteComponentProps<any> {
    logout: () => void;
    viewer?: Viewer;
}

interface State {}

class UserProfileButton extends React.Component<Props, State> {
    public render() {
        const { viewer, logout, match } = this.props;
        if (viewer) {
            return (
                <Button variant="contained" onClick={logout}>
                    Logout
                </Button>
            );
        } else {
            return (
                <FlatLink to={`/login?from=${encodeURIComponent(match.url)}`}>
                    <Button variant="contained">Login</Button>
                </FlatLink>
            );
        }
    }
}

function mapStateToProps(state: any, ownProps: any) {
    return {
        viewer: getViewerFromAuth(state.firebase.auth),
        logout: () => {
            ownProps.firebase.logout();
        }
    };
}

export default compose(
    withRouter,
    withFirebase,
    connect(mapStateToProps)
)(UserProfileButton);
