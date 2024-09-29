import React from "react";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import FeedbackIcon from "@material-ui/icons/Feedback";
import HomeIcon from "@material-ui/icons/Home";
import GameIcon from "@material-ui/icons/SportsEsports";
import BuildIcon from "@material-ui/icons/Build";
import { useAppContext } from "./AppContext";

export interface MenuItemDefinition {
  label: string;
  url: string;
}

export interface SiteSideBarProps {
  variant: "permanent" | "temporary";
  menuItems: MenuItemDefinition[];
}

function SiteSideBar(props: SiteSideBarProps) {
  const { context, setContext } = useAppContext();
  const { variant, menuItems } = props;
  const navigate = useNavigate();

  const handleClose = () => {
    setContext({ menuOpen: false });
  };

  const goToPage = async (location: string) => {
    handleClose();
    navigate(location);
  };

  return (
    <Drawer
      variant={variant}
      PaperProps={{ style: { width: 256 } }}
      open={context.menuOpen}
      onClose={handleClose}
    >
      <List>
        <ListItem key="home" button onClick={() => goToPage("/")}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem key="games" button onClick={() => goToPage("/games")}>
          <ListItemIcon>
            <GameIcon />
          </ListItemIcon>
          <ListItemText primary="Games" />
        </ListItem>
        <ListItem key="tools" button onClick={() => goToPage("/tools")}>
          <ListItemIcon>
            <BuildIcon />
          </ListItemIcon>
          <ListItemText primary="Tools" />
        </ListItem>
        <Divider key="items-section" />
        {menuItems.map((menuItem) => {
          return (
            <ListItem
              key={menuItem.url}
              button
              onClick={() => goToPage(menuItem.url)}
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
