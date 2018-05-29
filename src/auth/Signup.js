// @flow
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { compose } from 'redux';
import { withFirebase } from 'react-redux-firebase';
import { Card, CardContent, Typography } from '@material-ui/core';

type Props = {
    successUrl: string
};

function Signup(props: Props) {
    const { successUrl } = props;
    const uiConfig = {
        signInSuccessUrl: successUrl,
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="headline">Sign up</Typography>
                <Typography variant="body1">Login with google to create your account</Typography>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            </CardContent>
        </Card>
    );
}

export default compose(withFirebase)(Signup);
