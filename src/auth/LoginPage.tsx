import * as React from 'react';
import { firebase, firebaseUI } from '../firebase/firebaseSetup';
import { withFirebase } from 'react-redux-firebase';
import { compose } from 'redux';
import PageFlow from '../UI/PageFlow';
import Spacing from '../UI/Spacing';
import HeadlineLarge from '../UI/HeadlineLarge';
import 'firebaseui/dist/firebaseui.css';
import { RouteComponentProps, withRouter } from 'react-router';
import * as queryString from 'query-string';
import { CircularProgress } from '@material-ui/core';

interface Props extends RouteComponentProps<any> {}

interface State {
    isLoading: boolean;
}

class LoginPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isLoading: false
        };
    }

    public componentDidMount() {
        const { location } = this.props;
        const parsed = queryString.parse(location.search);
        const uiConfig = {
            signInSuccessUrl: parsed.from ? parsed.from : '/',
            signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
        };
        if (firebaseUI.isPendingRedirect()) {
            this.setState({
                isLoading: true
            });
        }

        firebaseUI.start('#firebaseui-auth-container', uiConfig);
    }

    public render() {
        const { isLoading } = this.state;
        return (
            <PageFlow>
                <Spacing />
                <HeadlineLarge>Login</HeadlineLarge>
                <Spacing />
                {isLoading ? <CircularProgress /> : null}
                <div id="firebaseui-auth-container" />
            </PageFlow>
        );
    }
}

export default compose(
    withRouter,
    withFirebase
)(LoginPage);
