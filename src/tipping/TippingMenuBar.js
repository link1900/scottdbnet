// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'material-ui';
import MenuBar from '../common/MenuBar';

function TippingMenuBar() {
    return (
        <MenuBar
            title="Tipstar"
            loginButton={
                <Button component={Link} to={{ pathname: '/tipping/login' }} color="inherit">
                    Login
                </Button>
            }
        />
    );
}

export default TippingMenuBar;
