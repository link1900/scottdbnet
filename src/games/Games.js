// @flow
import React from 'react';
import { Route } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import GamesMenuBar from './GamesMenuBar';
import GamesHome from './GamesHome';
import { gameDefinitions } from "./gameDefinitons";

function Games() {
    return (
        <div>
            <Grid container justify="center" spacing={0}>
                <Grid item xs={12}>
                    <GamesMenuBar />
                </Grid>
                <Grid item xs={12}>
                    <Route exact path="/games" component={GamesHome} />
                    {gameDefinitions.map(gameInfo => (
                        <Route key={gameInfo.name} path={`/games/${gameInfo.name}`} component={gameInfo.component} />
                    ))}
                </Grid>
            </Grid>
        </div>
    );
}

export default Games;
