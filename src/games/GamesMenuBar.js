// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { compose, withState } from 'recompose';
import { Typography, List, ListItem, ListItemText, Drawer } from 'material-ui';
import MenuBar from '../menu/MenuBar';
import { gameDefinitions } from './gameDefinitons';
import { FlatLink } from '../UI/FlatLink';

type Props = {
    menuOpen: boolean,
    setMenuOpen: Function
};

function GamesMenuBar(props: Props) {
    const homeInfo = { name: '', title: 'Home' };
    const { menuOpen, setMenuOpen } = props;

    return (
        <div>
            <MenuBar
                title={
                    <Typography variant="title" color="inherit" className="flex">
                        <FlatLink to={'/games'}>ScottDB Games</FlatLink>
                    </Typography>
                }
                showMenu
                onMenuPress={() => setMenuOpen(!menuOpen)}
            />
            <Drawer key="draw" open={menuOpen} onClose={() => setMenuOpen(false)}>
                <List>
                    {[homeInfo].concat(gameDefinitions).map(gameInfo => (
                        <ListItem
                            key={gameInfo.name}
                            onClick={() => setMenuOpen(false)}
                            button
                            component={Link}
                            to={`/games/${gameInfo.name}`}
                        >
                            <ListItemText primary={gameInfo.title} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </div>
    );
}

export default compose(withState('menuOpen', 'setMenuOpen', false))(GamesMenuBar);
