import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider
} from "@material-ui/core";
import { useHistory, useRouteMatch } from "react-router-dom";

export interface MenuItemDefinition {
  label: string;
  url: string;
}

export interface SiteSideBarProps {
  variant: "permanent" | "temporary";
  open?: boolean;
  close?: () => void;
  onClose?: () => void;
  rootLabel: string;
  menuItems: MenuItemDefinition[];
}

function SiteSideBar(props: SiteSideBarProps) {
  const { variant, open, onClose, close, rootLabel, menuItems } = props;
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
        <ListItem key={rootLabel} button onClick={() => goToPage(`${url}`)}>
          <ListItemText primary={rootLabel} />
        </ListItem>
        <Divider />
        {menuItems.map(menuItem => {
          return (
            <ListItem
              key={menuItem.url}
              button
              onClick={() => goToPage(`${url}/${menuItem.url}`)}
            >
              <ListItemText primary={menuItem.label} />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}

export default SiteSideBar;
