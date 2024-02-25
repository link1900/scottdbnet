import React from "react";
import { PageLayout } from "../../components/PageLayout";
import { PixiGameComponent } from "../gameEngines/pixi/PixiGameComponent";
import { runBalloonBurst } from "./BalloonBurstGame";

export default function BalloonBurst() {
  return (
    <PageLayout title="Balloon Burst">
      <PixiGameComponent width={500} height={500} runPixi={runBalloonBurst} />
    </PageLayout>
  );
}
