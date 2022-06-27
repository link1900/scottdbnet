import React from "react";
import GameIcon from "@material-ui/icons/SportsEsports";
import { SiteLayout } from "../components/SiteLayout";
import { MenuItemDefinition } from "../components/SiteSideBar";
import { gameDefinitions } from "./gameDefinitons";

export interface GameLayoutProps {
  children: React.ReactNode;
}

export function GameLayout({ children }: GameLayoutProps) {
  const gameMenuItems: MenuItemDefinition[] = gameDefinitions.map(gameDef => {
    return {
      label: gameDef.title,
      url: gameDef.name
    };
  });
  return (
    <SiteLayout
      title="Games"
      rootLabel="Games"
      rootIcon={GameIcon}
      menuItems={gameMenuItems}
    >
      {children}
    </SiteLayout>
  );
}
