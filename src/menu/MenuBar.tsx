import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { IconButton, Icon, AppBar, Toolbar } from '@material-ui/core';
import { compose } from 'recompose';

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
  public render() {
    const { classes, showMenu, onMenuPress } = this.props;
    return (
      <AppBar key="appBar" position="static" className={classes.appBar}>
        <Toolbar>
          {showMenu ? (
            <IconButton onClick={onMenuPress} className={classes.menuButton} color="inherit" aria-label="Menu">
              <Icon>menu</Icon>
            </IconButton>
          ) : null}
        </Toolbar>
      </AppBar>
    );
  }
}

export default compose(withStyles(styles))(MenuBar);
