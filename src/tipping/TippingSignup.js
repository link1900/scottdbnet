// @flow
import React from 'react';
import { Grid } from "material-ui";
import Signup from "../auth/Signup";

function TippingSignup() {
    return (
        <Grid container justify="center">
            <Grid item xs={10} sm={6} md={4} lg={3} xl={2}>
                <Signup successUrl="/tipping" />
            </Grid>
        </Grid>
    );
}

export default TippingSignup;
