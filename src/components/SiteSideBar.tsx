import React from "react";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { useHistory, useRouteMatch } from "react-router-dom";
import FeedbackIcon from "@material-ui/icons/Feedback";
import HomeIcon from "@material-ui/icons/Home";

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
  rootIcon: any;
  menuItems: MenuItemDefinition[];
}

function SiteSideBar(props: SiteSideBarProps) {
  const { variant, open, onClose, close, rootLabel, menuItems, rootIcon } = props;
  let { url } = useRouteMatch();
  const history = useHistory();
  const RootIcon = rootIcon;
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
        <ListItem key="home" button onClick={() => goToPage("/")}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem key={rootLabel} button onClick={() => goToPage(`${url}`)}>
          <ListItemIcon>
            <RootIcon />
          </ListItemIcon>
          <ListItemText primary={rootLabel} />
        </ListItem>
        <Divider key="items-section" />
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
        <Divider key="support-section" />
        <ListItem
          key="support"
          button
          component="a"
          href="https://scottdb.atlassian.net/servicedesk/customer/portal/3"
        >
          <ListItemIcon>
            <FeedbackIcon />
          </ListItemIcon>
          <ListItemText>Send feedback</ListItemText>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default SiteSideBar;
