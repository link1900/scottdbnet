import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { SitePageWithMenu } from "../components/SitePageWithMenu";
import { gameDefinitions } from "./gameDefinitons";
import { GameList } from "./GameList";

export function Games() {
  let { path } = useRouteMatch();
  return (
    <SitePageWithMenu>
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
    </SitePageWithMenu>
  );
}
