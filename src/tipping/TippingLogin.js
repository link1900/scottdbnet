// @flow
import React from 'react';
import { Grid } from '@material-ui/core';
import Login from '../auth/Login';

function TippingLogin() {
    return (
        <Grid container justify="center">
            <Grid item xs={10} sm={6} md={4} lg={3} xl={2}>
                <Login successUrl="/tipping" />
            </Grid>
        </Grid>
    );
}

export default TippingLogin;
