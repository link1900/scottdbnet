import React, { Suspense } from "react";
import { ThemeProvider } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./components/AppContext";
import { ErrorZone } from "./components/ErrorZone";
import { PageRoutes } from "./PageRoutes";
import { theme } from "./scottdbTheme";

export function App() {
  return (
    <ErrorZone>
      <AppContextProvider>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
              <PageRoutes />
            </Suspense>
          </BrowserRouter>
        </ThemeProvider>
      </AppContextProvider>
    </ErrorZone>
  );
}
