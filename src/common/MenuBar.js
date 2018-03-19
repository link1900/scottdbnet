// @flow
import React from 'react';
import { withStyles } from 'material-ui/styles';
import { Avatar, IconButton, Menu, MenuItem } from 'material-ui';
import { compose, withState } from 'recompose';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { getViewerFromAuth } from '../common/authHelper';

const styles = {
    root: {
        flexGrow: 1
    },
    appBar: {
        backgroundColor: '#004caf'
    },
    flex: {
        flex: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    }
};

type Props = {
    title: string,
    classes: Object,
    logout: Function,
    viewer: Object,
    anchorEl: Object,
    setAnchorEl: Function
};

function MenuBar(props: Props) {
    const { title, classes, logout, viewer, anchorEl, setAnchorEl } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="title" color="inherit" className={classes.flex}>
                        {title}
                    </Typography>
                    {viewer ? (
                        <div>
                            <IconButton
                                aria-owns={anchorEl ? 'user-menu' : null}
                                aria-haspopup="true"
                                onClick={event => setAnchorEl(event.currentTarget)}
                                color="inherit"
                            >
                                {viewer.imageUrl ? <Avatar alt={viewer.name} src={viewer.imageUrl} /> : viewer.name}
                            </IconButton>
                        </div>
                    ) : (
                        <Button component={Link} to={{ pathname: "/login", state: { successUrl: '/tipping' }}}  color="inherit">
                            Login
                        </Button>
                    )}
                    <Menu
                        id="user-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                    >
                        <MenuItem onClick={() => logout()}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </div>
    );
}

function mapStateToProps(state, ownProps) {
    return {
        viewer: getViewerFromAuth(state.firebase.auth),
        logout: () => {
            ownProps.setAnchorEl(null);
            ownProps.firebase.logout();
        }
    };
}

export default compose(
    withStyles(styles),
    withState('anchorEl', 'setAnchorEl', null),
    withFirebase,
    connect(mapStateToProps)
)(MenuBar);
