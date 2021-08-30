import React from "react";
import { ThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ErrorZone } from "./components/ErrorZone";
import { Games } from "./games/Games";
import { Home } from "./home/Home";
import { theme } from "./scottdbTheme";

export function App() {
  return (
    <ErrorZone>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/games" component={Games} />
          </Switch>
        </Router>
      </ThemeProvider>
    </ErrorZone>
  );
}
