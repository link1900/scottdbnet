// @flow
import React from 'react';
import { Grid, Typography, GridList, GridListTile, GridListTileBar } from 'material-ui';
import { Link } from 'react-router-dom';
import { gameDefinitions } from './gameDefinitons';

function GamesHome() {
    return (
        <Grid container justify="center" spacing={0}>
            <Grid item xs={10}>
                <div>
                    <div style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                        <Typography variant="headline">Click on a game to play!</Typography>
                    </div>
                    <GridList cols={3}>
                        {gameDefinitions.map(gameInfo => (
                            <GridListTile key={gameInfo.name} component={Link} to={`games/${gameInfo.name}`}>
                                <img src={gameInfo.image} alt={gameInfo.name} />
                                <GridListTileBar title={gameInfo.title} subtitle={<span>{gameInfo.year}</span>} />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            </Grid>
        </Grid>
    );
}

export default GamesHome;
