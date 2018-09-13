import { Card, CardContent, Typography } from '@material-ui/core';
import { firebase } from '../firebase/firebaseSetup';
import * as React from 'react';
// @ts-ignore
import * as StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { withFirebase } from 'react-redux-firebase';
import { compose } from 'redux';

interface Props {
    successUrl: string;
}

function Login(props: Props) {
    const { successUrl } = props;
    const uiConfig = {
        signInSuccessUrl: successUrl,
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="headline">Login</Typography>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            </CardContent>
        </Card>
    );
}

export default compose(withFirebase)(Login);
