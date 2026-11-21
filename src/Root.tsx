import React from "react";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { FinanceShowcase } from "./compositions/FinanceShowcase";
import { LossLeaderVideo } from "./videos/loss-leader/LossLeaderVideo";
import { LossLeaderShortVideo } from "./videos/loss-leader/LossLeaderShortVideo";
import { CinematicPianoVideo } from "./videos/music-visualizer/CinematicPianoVideo";
import { lossLeaderTiming } from "./data/lossLeaderTiming";
import { lossLeaderShortTiming } from "./data/lossLeaderShortTiming";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Video Musik Sinematik / Ambient (Audio Reactive Visualizer 16:9) */}
      <Composition
        id="CinematicPiano"
        component={CinematicPianoVideo}
        durationInFrames={1800} // 60 detik (bisa diubah sesuai durasi lagu Suno)
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "MIDNIGHT CONCERTO",
          artist: "Ardany Music",
          audioFileName: "music/loss-leader-bgm.mp3",
          accentColor: "#38bdf8",
        }}
      />

      {/* Video YouTube Shorts (Vertikal 9:16): Loss Leader (39 detik / 1170 frames) */}
      <Composition
        id="LossLeaderShort"
        component={LossLeaderShortVideo}
        durationInFrames={lossLeaderShortTiming.totalFrames}
        fps={lossLeaderShortTiming.fps}
        width={1080}
        height={1920}
      />

      {/* Video YouTube Finansial Lengkap (Horizontal 16:9): Strategi Loss Leader */}
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
