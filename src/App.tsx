import React, { Suspense } from "react";
import { ThemeProvider } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./components/AppContext";
import { ErrorZone } from "./components/ErrorZone";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { PageRoutes } from "./PageRoutes";
import { theme } from "./scottdbTheme";

export function App() {
  return (
    <ErrorZone>
      <AppContextProvider>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Suspense fallback={<LoadingSpinner message="Loading..." />}>
              <PageRoutes />
            </Suspense>
          </BrowserRouter>
        </ThemeProvider>
      </AppContextProvider>
    </ErrorZone>
  );
}
