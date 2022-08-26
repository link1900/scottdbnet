import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Page } from "./components/Page";
import { gameDefinitions } from "./games/gameDefinitons";
import { GameList } from "./games/GameList";
import { Home } from "./home/Home";
import { toolDefinitions } from "./tools/toolDefinitions";
import { ToolList } from "./tools/ToolList";

const ToolSiteLazy = lazy(() => import("./tools/ToolSite"));
const GameSiteLazy = lazy(() => import("./games/GameSite"));

export function PageRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/games" element={<GameSiteLazy />}>
        <Route index element={<GameList />} />
        {gameDefinitions.map((gameDefinition) => {
          const Game = gameDefinition.component;
          return (
            <Route
              key={gameDefinition.name}
              path={gameDefinition.name}
              element={
                <Page title={gameDefinition.title}>
                  <Game />
                </Page>
              }
            />
          );
        })}
      </Route>
      <Route path="/tools" element={<ToolSiteLazy />}>
        <Route index element={<ToolList />} />
        {toolDefinitions.map((toolDefinition) => {
          const Tool = toolDefinition.component;
          return (
            <Route
              key={toolDefinition.name}
              path={toolDefinition.name}
              element={
                <Page title={toolDefinition.title}>
                  <Tool />
                </Page>
              }
            />
          );
        })}
      </Route>
    </Routes>
  );
}
