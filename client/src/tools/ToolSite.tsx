import React from "react";
import { Outlet } from "react-router-dom";
import { useTitle } from "react-use";
import { ToolsLayout } from "./ToolsLayout";

export default function ToolSite() {
  useTitle("Tools");
  return (
    <ToolsLayout>
      <Outlet />
    </ToolsLayout>
  );
}
