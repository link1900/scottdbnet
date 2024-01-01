import React from "react";
import { PageLayout } from "../../components/PageLayout";
import { PhaserGameComponent } from "../gameEngines/phaser/PhaserGameComponent";
import { TANK_GAME } from "./scenes/TankGame";
import { TANK_GAME_LOADER } from "./scenes/TankGameLoader";

export default function Tanks() {
  return (
    <PageLayout title="Tanks">
      <PhaserGameComponent
        width={600}
        height={600}
        sceneNames={[TANK_GAME_LOADER, TANK_GAME]}
      />
    </PageLayout>
  );
}
