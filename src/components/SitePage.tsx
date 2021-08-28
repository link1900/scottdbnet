import React, { PropsWithChildren } from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  pageContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column"
  },
  mainContent: {
    flex: 1,
    padding: "32px 16px",
    [theme.breakpoints.up("sm")]: {
      padding: "48px 24px"
    }
  }
}));

export function SitePage(props: PropsWithChildren<{}>) {
  const { children } = props;
  const classes = useStyles();

  if (!children) {
    return null;
  }

  return (
    <div className={classes.pageContent}>
      <main className={classes.mainContent}>
        <Container>{children}</Container>
      </main>
    </div>
  );
}
