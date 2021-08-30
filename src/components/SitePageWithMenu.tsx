import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SiteSideBar from "./SiteSideBar";
import SiteHeader from "./SiteHeader";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flex: 1,
    minHeight: "100vh"
  },
  drawer: {
    width: 256,
    flexShrink: 0
  },
  pageArea: {
    flex: 1,
    display: "flex",
    flexDirection: "column"
  },
  mainContent: {
    flex: 1,
    padding: "48px 16px",
    background: "#eaeff1",
    [theme.breakpoints.up("sm")]: {
      padding: "48px 24px"
    }
  },
  tracer: {
    background: "green"
  }
}));

export interface SiteLayoutProps {
  children: React.ReactNode;
}

export function SitePageWithMenu(props: SiteLayoutProps) {
  const classes = useStyles();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { children } = props;
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  return (
    <div className={classes.root}>
      <nav>
        <SiteSideBar
          variant="temporary"
          open={isMenuOpen}
          close={() => setIsMenuOpen(false)}
          onClose={toggleMenu}
        />
      </nav>
      <div className={classes.pageArea}>
        <SiteHeader toggleMenu={toggleMenu} />
        {children}
      </div>
    </div>
  );
}
