import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { useTitle } from "react-use";
import { Page } from '../components/Page';
import { gameDefinitions } from "./gameDefinitons";
import { GameLayout } from "./GameLayout";
import { GameList } from "./GameList";

export default function GameSite() {
  let { path } = useRouteMatch();
  useTitle("Games");
  return (
    <GameLayout>
      <Switch>
        <Route exact path={path}>
          <GameList />
        </Route>
        {gameDefinitions.map(gameDefinition => {
          const Game = gameDefinition.component;
          return (
            <Route
              key={gameDefinition.name}
              path={`${path}/${gameDefinition.name}`}
            >
              <Page title={gameDefinition.title}>
                <Game />
              </Page>
            </Route>
          );
        })}
      </Switch>
    </GameLayout>
  );
}
