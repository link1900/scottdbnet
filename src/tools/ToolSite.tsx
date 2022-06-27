import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { useTitle } from 'react-use';
import { toolDefinitions } from "./toolDefinitions";
import { ToolList } from "./ToolList";
import { ToolsLayout } from './ToolsLayout';

export default function ToolSite() {
  let { path } = useRouteMatch();
  useTitle('Tools');
  return (
    <ToolsLayout>
      <Switch>
        <Route exact path={path}>
          <ToolList />
        </Route>
        {toolDefinitions.map(toolDefinition => {
          const Tool = toolDefinition.component;
          return (
            <Route
              key={toolDefinition.name}
              path={`${path}/${toolDefinition.name}`}
            >
              <Tool />
            </Route>
          );
        })}
      </Switch>
    </ToolsLayout>
  );
}
