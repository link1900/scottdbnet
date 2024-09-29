import React, { PropsWithChildren } from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SiteHeader from "./SiteHeader";

const useStyles = makeStyles((theme) => ({
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

export interface PageProps {
  siteHeader?: boolean;
  title?: string;
}

export function Page(props: PropsWithChildren<PageProps>) {
  const { children, title, siteHeader = true } = props;
  const classes = useStyles();

  if (!children) {
    return null;
  }

  return (
    <div className={classes.pageContent}>
      {siteHeader ? <SiteHeader title={title ?? ""} /> : null}
      <main className={classes.mainContent}>
        <Container>{children}</Container>
      </main>
    </div>
  );
}
