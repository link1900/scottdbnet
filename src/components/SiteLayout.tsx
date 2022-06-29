import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SiteSideBar, { MenuItemDefinition } from "./SiteSideBar";

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
  menuItems: MenuItemDefinition[];
}

export function SiteLayout(props: SiteLayoutProps) {
  const classes = useStyles();
  const { children, menuItems } = props;
  return (
    <div className={classes.root}>
      <nav>
        <SiteSideBar
          variant="temporary"
          menuItems={menuItems}
        />
      </nav>
      <div className={classes.pageArea}>
        {children}
      </div>
    </div>
  );
}
