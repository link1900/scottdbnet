import { createTheme } from "@material-ui/core/styles";

export let theme = createTheme({
  palette: {
    primary: {
      light: "#63a4ff",
      main: "#1976d2",
      dark: "#004ba0",
      contrastText: "#fff"
    },
    secondary: {
      light: "#8bf6ff",
      main: "#4fc3f7",
      dark: "#0093c4",
      contrastText: "#000"
    }
  }
});
