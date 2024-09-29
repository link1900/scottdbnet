import React from "react";
import {
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import { Page } from "../components/Page";
import { useGreyBody } from "../home/useBackgroundColor";
import { toolDefinitions } from "./toolDefinitions";
import { useNavigate } from "react-router-dom";

export function ToolList() {
  useGreyBody();
  const navigate = useNavigate();

  const goToPage = async (location: string) => {
    navigate(location);
  };

  return (
    <Page title={"Tools"}>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardContent>
              <List>
                {toolDefinitions.map((toolDefinition) => {
                  return (
                    <ListItem
                      key={toolDefinition.name}
                      button
                      onClick={() => goToPage(toolDefinition.name)}
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
    </Page>
  );
}
