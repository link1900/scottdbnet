// @flow
import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { Route, Link } from 'react-router-dom';
import firebase from 'firebase';
import {AccountCircle} from "material-ui-icons";

const styles = {
    root: {
        flexGrow: 1
    },
    appBar: {
        backgroundColor: '#004caf'
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

function Tipping(props) {
    const { classes } = props;
    const currentUser = firebase.auth().currentUser;
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="title" color="inherit" className={classes.flex}>
                        Tipstar
                    </Typography>
                    <Button color="inherit"><Link to="/signIn" className="textLink">Sign up</Link></Button>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withStyles(styles)(Tipping);