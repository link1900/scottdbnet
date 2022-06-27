import React from "react";
import { SiteLayout } from "../components/SiteLayout";
import { MenuItemDefinition } from "../components/SiteSideBar";
import { toolDefinitions } from "./toolDefinitions";
import BuildIcon from "@material-ui/icons/Build";

export interface ToolsLayoutProps {
  children: React.ReactNode;
}

export function ToolsLayout({ children }: ToolsLayoutProps) {
  const menuItems: MenuItemDefinition[] = toolDefinitions.map(toolDef => {
    return {
      label: toolDef.title,
      url: toolDef.name
    };
  });
  return (
    <SiteLayout title="Tools" rootLabel="Tools" menuItems={menuItems} rootIcon={BuildIcon}>
      {children}
    </SiteLayout>
  );
}
