import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Grid,
  IconButton,
  Toolbar,
  Typography
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useAppContext } from "./AppContext";

export interface Props {
  title: string;
}

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginLeft: -theme.spacing(1)
  }
}));

function SiteHeader(props: Props) {
  const { context, setContext } = useAppContext();
  const { title } = props;
  const classes = useStyles();

  const toggleMenu = () => {
    setContext({
      menuOpen: !context.menuOpen
    });
  };

  return (
    <AppBar
      data-id="app-bar-site"
      color="primary"
      position="sticky"
      elevation={0}
    >
      <Toolbar>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={toggleMenu}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="h6">{title}</Typography>
          </Grid>
          <Grid item xs />
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default SiteHeader;
