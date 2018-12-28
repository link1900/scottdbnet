import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Avatar, IconButton, Menu, MenuItem, Icon, AppBar, Toolbar } from '@material-ui/core';
import { compose, withState } from 'recompose';
import { withFirebase } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { getViewerFromAuth } from '../auth/authHelper';

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

interface Props {
    title: string;
    classes?: any;
    logout?: any;
    viewer?: any;
    anchorEl?: any;
    setAnchorEl?: any;
    loginButton?: any;
    showMenu: boolean;
    onMenuPress: () => void;
}

class MenuBar extends React.Component<Props, object> {
    public setTarget = (event: any) => {
        const { setAnchorEl } = this.props;
        setAnchorEl(event.currentTarget);
    };

    public clearTarget = () => {
        const { setAnchorEl } = this.props;
        setAnchorEl(null);
    };

    public logout = () => {
        const { logout } = this.props;
        logout();
    };

    public render() {
        const { classes, viewer, anchorEl, loginButton, showMenu, onMenuPress } = this.props;
        return (
            <AppBar key="appBar" position="static" className={classes.appBar}>
                <Toolbar>
                    {showMenu ? (
                        <IconButton
                            onClick={onMenuPress}
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="Menu"
                        >
                            <Icon>menu</Icon>
                        </IconButton>
                    ) : null}
                    {viewer ? (
                        <IconButton
                            aria-owns={anchorEl ? 'user-menu' : undefined}
                            aria-haspopup="true"
                            onClick={this.setTarget}
                            color="inherit"
                        >
                            {viewer.imageUrl ? <Avatar alt={viewer.name} src={viewer.imageUrl} /> : viewer.name}
                        </IconButton>
                    ) : (
                        loginButton
                    )}
                    <Menu id="user-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.clearTarget}>
                        <MenuItem onClick={this.logout}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        );
    }
}

function mapStateToProps(state: any, ownProps: any) {
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
