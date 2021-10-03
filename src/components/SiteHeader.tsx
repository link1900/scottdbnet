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

export interface Props {
  toggleMenu: () => void;
}

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginLeft: -theme.spacing(1)
  }
}));

function SiteHeader(props: Props) {
  const { toggleMenu } = props;
  const classes = useStyles();

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
            <Typography variant="h6">Linkin Games</Typography>
          </Grid>
          <Grid item xs />
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default SiteHeader;
