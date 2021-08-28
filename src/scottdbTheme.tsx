import { createTheme } from "@material-ui/core/styles";

export let theme = createTheme({
  palette: {
    primary: {
      light: '#5f5fc4',
      main: '#283593',
      dark: '#001064',
      contrastText: '#fff',
    },
    secondary: {
      light: '#8bf6ff',
      main: '#4fc3f7',
      dark: '#0093c4',
      contrastText: '#000',
    },
  }
});
