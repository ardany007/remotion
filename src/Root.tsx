import React from "react";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { FinanceShowcase } from "./compositions/FinanceShowcase";
import { LossLeaderVideo } from "./videos/loss-leader/LossLeaderVideo";
import { lossLeaderTiming } from "./data/lossLeaderTiming";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Video YouTube Finansial Lengkap: Strategi Loss Leader (111.7 detik / 3350 frames) */}
      <Composition
        id="LossLeader"
        component={LossLeaderVideo}
        durationInFrames={lossLeaderTiming.totalFrames}
        fps={lossLeaderTiming.fps}
        width={1920}
        height={1080}
      />

      {/* Komposisi Showcase Komponen Finansial */}
      <Composition
        id="FinanceShowcase"
        component={FinanceShowcase}
        durationInFrames={720}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Template Starter Default */}
      <MyComposition />
    </>
  );
};
