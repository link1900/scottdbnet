import React from "react";
import {
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import { SitePage } from "../components/SitePage";
import { useGreyBody } from "../home/useBackgroundColor";
import { toolDefinitions } from "./toolDefinitions";
import { useHistory, useRouteMatch } from "react-router-dom";

export function ToolList() {
  useGreyBody();
  const history = useHistory();
  let { url } = useRouteMatch();

  const goToPage = async (location: string) => {
    history.push(location);
  };

  return (
    <SitePage>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardContent>
              <List>
                {toolDefinitions.map(toolDefinition => {
                  return (
                    <ListItem
                      button
                      onClick={() => goToPage(`${url}/${toolDefinition.name}`)}
                    >
                      <ListItemText primary={toolDefinition.title} />
                    </ListItem>
                  );
                })}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </SitePage>
  );
}
