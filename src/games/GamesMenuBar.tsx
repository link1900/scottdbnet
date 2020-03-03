import React from 'react';
import { List, ListItem, ListItemText, Drawer, AppBar, Toolbar, Icon, IconButton } from '@material-ui/core';
import { GameDefinition, gameDefinitions } from './gameDefinitons';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { HeadlineSmall } from '../UI/HeadlineSmall';
import FlexExpander from '../UI/FlexExpander';

interface Props extends RouteComponentProps<any> {}

interface State {
  menuOpen: boolean;
}

const homeInfo: GameDefinition = { title: 'Home' };

class GamesMenuBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      menuOpen: false
    };
  }

  public toggleMenu = () => {
    this.setMenuOpen(!this.state.menuOpen);
  };

  public closeMenu = () => {
    this.setMenuOpen(false);
  };

  public setMenuOpen = (menuOpen: boolean) => {
    this.setState({ menuOpen });
  };

  public getMenuLinkFromGameInfo = (gameInfo: GameDefinition) => {
    const { match } = this.props;
    const linkTo = gameInfo.name ? `${match.url}/${gameInfo.name}` : match.url;
    return (
      <Link key={gameInfo.title} to={linkTo} onClick={() => this.setMenuOpen(false)} style={{ textDecoration: 'none' }}>
        <ListItem>
          <ListItemText primary={gameInfo.title} />
        </ListItem>
      </Link>
    );
  };

  public render() {
    const { menuOpen } = this.state;
    return (
      <div>
        <AppBar key="appBar" position="static" style={{ backgroundColor: '#004caf' }}>
          <Toolbar>
            <IconButton
              onClick={this.toggleMenu}
              style={{
                marginLeft: -12,
                marginRight: 20
              }}
              color="inherit"
              aria-label="Menu"
            >
              <Icon>menu</Icon>
            </IconButton>
            <HeadlineSmall>Linkin Games</HeadlineSmall>
            <FlexExpander />
          </Toolbar>
        </AppBar>
        <Drawer key="draw" open={menuOpen} onClose={this.closeMenu}>
          <List>{[homeInfo].concat(gameDefinitions).map(this.getMenuLinkFromGameInfo)}</List>
        </Drawer>
      </div>
    );
  }
}

export default compose(withRouter)(GamesMenuBar);
