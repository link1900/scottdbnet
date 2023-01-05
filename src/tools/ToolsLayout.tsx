import React from "react";
import { SiteLayout } from "../components/SiteLayout";
import { MenuItemDefinition } from "../components/SiteSideBar";
import { toolDefinitions } from "./toolDefinitions";

export interface ToolsLayoutProps {
  children: React.ReactNode;
}

export function ToolsLayout({ children }: ToolsLayoutProps) {
  const menuItems: MenuItemDefinition[] = toolDefinitions.map((toolDef) => {
    return {
      label: toolDef.title,
      url: toolDef.name
    };
  });
  return <SiteLayout menuItems={menuItems}>{children}</SiteLayout>;
}
