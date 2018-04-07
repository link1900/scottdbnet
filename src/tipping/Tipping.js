// @flow
import React from 'react';
import { Route } from 'react-router-dom';
import { Grid } from 'material-ui';
import TippingMenuBar from './TippingMenuBar';
import TippingLogin from './TippingLogin';
import TippingHome from './TippingHome';

function Tipping() {
    return (
        <div>
            <Grid container spacing={40} justify="center">
                <Grid item xs={12}>
                    <TippingMenuBar />
                </Grid>
                <Grid item xs={12}>
                    <Route exact path="/tipping" component={TippingHome} />
                    <Route path="/tipping/login" component={TippingLogin} />
                </Grid>
            </Grid>
        </div>
    );
}

export default Tipping;
