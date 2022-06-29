import React, { lazy, Suspense } from "react";
import { ThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AppContextProvider } from './components/AppContext';
import { ErrorZone } from "./components/ErrorZone";
import { Home } from "./home/Home";
import { theme } from "./scottdbTheme";

const GameLazy = lazy(() => import("./games/GameSite"));
const ToolLazy = lazy(() => import("./tools/ToolSite"));

export function App() {
  return (
    <ErrorZone>
      <AppContextProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/games" component={GameLazy} />
              <Route path="/tools" component={ToolLazy} />
            </Switch>
          </Suspense>
        </Router>
      </ThemeProvider>
      </AppContextProvider>
    </ErrorZone>
  );
}
