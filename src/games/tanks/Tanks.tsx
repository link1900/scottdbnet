import React from "react";
import { PageLayout } from "../../components/PageLayout";
import { PhaserGameComponent } from "../gameEngines/phaser/PhaserGameComponent";
import "./scenes/TankGame";

export default function Tanks() {
  return (
    <PageLayout title="Tanks">
      <PhaserGameComponent width={600} height={600} sceneNames={["TankMain"]} />
    </PageLayout>
  );
}
