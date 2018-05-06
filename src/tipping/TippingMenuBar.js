// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from 'material-ui';
import MenuBar from '../menu/MenuBar';

function TippingMenuBar() {
    return (
        <MenuBar
            title={
                <Typography variant="title" color="inherit" className="flex">
                    <Link to={'/tipping'} className="textLink">Tipstar</Link>
                </Typography>
            }
            loginButton={
                <div>
                    <Button component={Link} to={{ pathname: '/tipping/signup' }} color="inherit">
                        Sign up
                    </Button>
                    <Button component={Link} to={{ pathname: '/tipping/login' }} color="inherit">
                        Login
                    </Button>
                </div>
            }
        />
    );
}

export default TippingMenuBar;
