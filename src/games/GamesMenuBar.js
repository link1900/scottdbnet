// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from 'material-ui';
import MenuBar from '../common/MenuBar';

function GamesMenuBar() {
    return (
        <MenuBar
            title={
                <Typography variant="title" color="inherit" className="flex">
                    <Link to={'/games'} className="textLink">ScottDB Games</Link>
                </Typography>
            }
        />
    );
}

export default GamesMenuBar;
