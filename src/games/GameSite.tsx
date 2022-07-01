import React from "react";
import { Outlet } from "react-router-dom";
import { useTitle } from "react-use";
import { GameLayout } from "./GameLayout";

export default function GameSite() {
  useTitle("Games");
  return (
    <GameLayout>
      <Outlet />
    </GameLayout>
  );
}
