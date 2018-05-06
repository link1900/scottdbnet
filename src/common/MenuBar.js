// @flow
import React from 'react';
import { withStyles } from 'material-ui/styles';
import { Avatar, IconButton, Menu, MenuItem, Icon } from 'material-ui';
import { compose, withState } from 'recompose';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { withFirebase } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { getViewerFromAuth } from '../common/authHelper';


const styles = {
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
    title: Object,
    classes: Object,
    logout: Function,
    viewer: Object,
    anchorEl: Object,
    setAnchorEl: Function,
    loginButton: Object,
    showMenu: boolean,
    onMenuPress: Function
};

function MenuBar(props: Props) {
    const { title, classes, logout, viewer, anchorEl, setAnchorEl, loginButton, showMenu, onMenuPress } = props;
    return (
        <div>
            <AppBar key="appBar" position="static" className={classes.appBar}>
                <Toolbar>
                    { showMenu ? (
                        <IconButton onClick={onMenuPress} className={classes.menuButton} color="inherit" aria-label="Menu">
                            <Icon>menu</Icon>
                        </IconButton>
                    ) : null}
                    {title}
                    {viewer ? (
                        <IconButton
                            aria-owns={anchorEl ? 'user-menu' : null}
                            aria-haspopup="true"
                            onClick={event => setAnchorEl(event.currentTarget)}
                            color="inherit"
                        >
                            {viewer.imageUrl ? <Avatar alt={viewer.name} src={viewer.imageUrl} /> : viewer.name}
                        </IconButton>
                    ) : (
                        loginButton
                    )}
                    <Menu id="user-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
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
