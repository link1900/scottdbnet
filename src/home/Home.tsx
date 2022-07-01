import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Card,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from "@material-ui/core";
import { useTitle } from "react-use";
import { Page } from "../components/Page";
import diceIcon from "./diceIcon.png";
import gcaIcon from "./gcaLogo.png";
import githubLogo from "./github.png";
import siteIcon from "./icon.png";
import toolIcon from "./toolIcon.png";
import linkedinLogo from "./linkedin.png";
import mailIcon from "./mailIcon.png";
import { useGreyBody } from "./useBackgroundColor";

export function Home() {
  useGreyBody();
  useTitle("Scott Brown");
  const navigate = useNavigate();

  const navTo = (route: string) => {
    navigate(route);
  };
  return (
    <Page siteHeader={false}>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardContent>
              <List>
                <ListItem button component="a" href="https://scottdb.net">
                  <ListItemAvatar>
                    <Avatar src={siteIcon} alt={"Scott Brown logo"} />
                  </ListItemAvatar>
                  <ListItemText primary="Scott Brown" />
                </ListItem>
                <Divider />
                <ListItem button onClick={() => navTo("/games")}>
                  <ListItemAvatar>
                    <Avatar src={diceIcon} alt={"dice icon"} />
                  </ListItemAvatar>
                  <ListItemText primary="Games" />
                </ListItem>
                <ListItem button onClick={() => navTo("/tools")}>
                  <ListItemAvatar>
                    <Avatar src={toolIcon} alt={"tool icon"} />
                  </ListItemAvatar>
                  <ListItemText primary="Tools" />
                </ListItem>
                <ListItem
                  button
                  component="a"
                  href="https://ranker.scottdb.net"
                >
                  <ListItemAvatar>
                    <Avatar src={gcaIcon} alt={"gca logo"} />
                  </ListItemAvatar>
                  <ListItemText primary="Greyhound Rankings" />
                </ListItem>
                <ListItem button component="a" href="mailto:link1900@gmail.com">
                  <ListItemAvatar>
                    <Avatar src={mailIcon} alt={"email icon"} />
                  </ListItemAvatar>
                  <ListItemText primary="Email" />
                </ListItem>
                <ListItem
                  button
                  component="a"
                  href="https://github.com/link1900"
                >
                  <ListItemAvatar>
                    <Avatar src={githubLogo} alt={"github logo"} />
                  </ListItemAvatar>
                  <ListItemText primary="Github" />
                </ListItem>
                <ListItem
                  button
                  component="a"
                  href={"https://www.linkedin.com/in/scott-brown-246882b"}
                >
                  <ListItemAvatar>
                    <Avatar src={linkedinLogo} alt={"linkedin logo"} />
                  </ListItemAvatar>
                  <ListItemText primary="Linkedin" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Page>
  );
}
