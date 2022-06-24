import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { gameDefinitions } from "./gameDefinitons";
import { GameLayout } from './GameLayout';
import { GameList } from "./GameList";

export function Games() {
  let { path } = useRouteMatch();
  return (
    <GameLayout>
      <Switch>
        <Route exact path={path}>
          <GameList />
        </Route>
        {gameDefinitions.map((gameDefinition) => {
          const Game = gameDefinition.component;
          return (
            <Route
              key={gameDefinition.name}
              path={`${path}/${gameDefinition.name}`}
            >
              <Game />
            </Route>
          );
        })}
      </Switch>
    </GameLayout>
  );
}
