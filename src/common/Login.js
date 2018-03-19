// @flow
import React from 'react';
import type { Location } from 'react-router-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { compose } from 'redux';
import { withFirebase } from 'react-redux-firebase';
import { Card, CardContent, Typography } from 'material-ui';


type Props = {
    location: Location
};

function Login(props: Props) {
    const { location  } = props;
    const successUrl = location.state && location.state.successUrl;

    const uiConfig = {
        signInSuccessUrl: successUrl,
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
    };

    return (
        <div className="fullPage centerParent">
            <Card className="centerChild">
                <CardContent>
                    <Typography variant="headline">Login</Typography>
                    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                </CardContent>
            </Card>
        </div>
    );
}

export default compose(withFirebase)(Login);
