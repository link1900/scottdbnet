import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider
} from "@material-ui/core";
import { gameDefinitions } from "../games/gameDefinitons";
import { useHistory, useRouteMatch } from "react-router-dom";

export interface SiteSideBarProps {
  variant: "permanent" | "temporary";
  open?: boolean;
  close?: () => void;
  onClose?: () => void;
}

function SiteSideBar(props: SiteSideBarProps) {
  const { variant, open, onClose, close } = props;
  let { url } = useRouteMatch();
  const history = useHistory();

  const goToPage = async (location: string) => {
    if (close) {
      close();
    }
    history.push(location);
  };

  return (
    <Drawer
      variant={variant}
      PaperProps={{ style: { width: 256 } }}
      open={open}
      onClose={onClose}
    >
      <List>
        <ListItem key="games" button onClick={() => goToPage(`${url}`)}>
          <ListItemText primary="Games" />
        </ListItem>
        <Divider />
        {gameDefinitions.map(gameDefinition => {
          return (
            <ListItem
              key={gameDefinition.name}
              button
              onClick={() => goToPage(`${url}/${gameDefinition.name}`)}
            >
              <ListItemText primary={gameDefinition.title} />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}

export default SiteSideBar;
