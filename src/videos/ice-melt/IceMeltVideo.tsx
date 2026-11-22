import React from "react";
import { AbsoluteFill, Audio, Series, staticFile } from "remotion";
import { CameraDrift } from "../../components/common/CameraDrift";
import { Background } from "../../components/finance/Background";
import { ChapterBadge } from "../../components/finance/ChapterBadge";
import { KineticHeadline } from "../../components/finance/KineticHeadline";
import { iceMeltTiming } from "../../data/iceMeltTiming";
import { iceMeltTheme } from "../../theme/iceMeltTheme";
import { RotatingGlobe } from "../../components/ice-melt/RotatingGlobe";
import { SeaLevelRise } from "../../components/ice-melt/SeaLevelRise";
import { IsostaticRebound } from "../../components/ice-melt/IsostaticRebound";
import { EarthRotationGauge } from "../../components/ice-melt/EarthRotationGauge";
import { OceanConveyorMap } from "../../components/ice-melt/OceanConveyorMap";
import { PermafrostMethane } from "../../components/ice-melt/PermafrostMethane";
import { IceMeltSubtitleBar } from "../../components/ice-melt/IceMeltSubtitleBar";

export const IceMeltVideo: React.FC = () => {
  const { scenes } = iceMeltTiming;

  return (
    <AbsoluteFill style={{ backgroundColor: iceMeltTheme.colors.bgDark }}>
      {/* Backsound Orisinal Sintesis (Looping dengan volume ducking 12%) */}
      <Audio
        src={staticFile("music/ice-melt-bgm.mp3")}
        volume={0.12}
        loop
      />

      <Series>
        {/* ========================================================
            SCENE 1: HOOK & HILANGNYA 28 TRILIUN TON ES
            ======================================================== */}
        <Series.Sequence durationInFrames={scenes.scene1.frames}>
          <Audio src={staticFile("vo/ice-melt/scene1.mp3")} volume={1} />
          <Background glowColor="rgba(56, 189, 248, 0.25)" />
          <ChapterBadge chapter="PROLOG" title="SKENARIO BUMI TANPA ES" color={iceMeltTheme.colors.primaryCyan} />

          <CameraDrift type="zoom-in" intensity={0.06}>
            <AbsoluteFill
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 80px 100px 80px",
                gap: 28,
              }}
            >
              <KineticHeadline
                tag="EKSPERIMEN FISIKA BUMI"
                mainText="Bagaimana Jika Semua Es di Bumi"
                highlightedText="Mencair Dalam Semalam?"
                subtitle="Bukan cuma banjir raksasa... jam di ponselmu bahkan harus disetel ulang!"
                highlightColor={iceMeltTheme.colors.primaryCyan}
              />

              <div style={{ marginTop: 10 }}>
                <RotatingGlobe meltProgress={0.4} />
              </div>
            </AbsoluteFill>
          </CameraDrift>

          <IceMeltSubtitleBar cues={scenes.scene1.subtitles} />
        </Series.Sequence>

        {/* ========================================================
            SCENE 2: TENGGELAMNYA PESISIR & NAIKNYA AIR LAUT 66 METER
            ======================================================== */}
        <Series.Sequence durationInFrames={scenes.scene2.frames}>
          <Audio src={staticFile("vo/ice-melt/scene2.mp3")} volume={1} />
          <Background glowColor="rgba(2, 132, 199, 0.25)" />
          <ChapterBadge chapter="BAB 1" title="KENAIKAN LAUT GLOBAL (+66M)" color={iceMeltTheme.colors.waterBlue} />

          <CameraDrift type="pan-right" intensity={0.05}>
            <AbsoluteFill
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 80px 90px 80px",
                gap: 24,
              }}
            >
              <KineticHeadline
                tag="HUKUM ARCHIMEDES & ELEVASI"
                mainText="Es Terapung vs Es Daratan"
                highlightedText="+66 Meter Menenggelamkan 40% Peradaban"
                subtitle="Jakarta, Tokyo, New York, dan London lenyap permanen di bawah samudra."
                highlightColor="#f87171"
              />

              <SeaLevelRise />
            </AbsoluteFill>
          </CameraDrift>

          <IceMeltSubtitleBar cues={scenes.scene2.subtitles} />
        </Series.Sequence>

        {/* ========================================================
            SCENE 3: KETIKA KERAK BUMI MEMBAL (ISOSTASY & VULKANISME)
            ======================================================== */}
        <Series.Sequence durationInFrames={scenes.scene3.frames}>
          <Audio src={staticFile("vo/ice-melt/scene3.mp3")} volume={1} />
          <Background glowColor="rgba(249, 115, 22, 0.25)" />
          <ChapterBadge chapter="BAB 2" title="GEOFISIKA & DEKOMPRESI MAGMA" color={iceMeltTheme.colors.magmaOrange} />

          <CameraDrift type="zoom-out" intensity={0.06}>
            <AbsoluteFill
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 80px 90px 80px",
                gap: 24,
              }}
            >
              <KineticHeadline
                tag="KERAK BUMI MEMBAL"
                mainText="Post-Glacial Rebound & Dekompresi"
                highlightedText="Letusan Serentak 100+ Gunung Berapi"
                subtitle="Hilangnya beban es 2 km memicu gempa M8+ dan letusan magma dahsyat."
                highlightColor={iceMeltTheme.colors.magmaOrange}
              />

              <IsostaticRebound />
            </AbsoluteFill>
          </CameraDrift>

          <IceMeltSubtitleBar cues={scenes.scene3.subtitles} />
        </Series.Sequence>

        {/* ========================================================
            SCENE 4: HARI YANG MENJADI LEBIH PANJANG (ROTASI BUMI)
            ======================================================== */}
        <Series.Sequence durationInFrames={scenes.scene4.frames}>
          <Audio src={staticFile("vo/ice-melt/scene4.mp3")} volume={1} />
          <Background glowColor="rgba(56, 189, 248, 0.22)" />
          <ChapterBadge chapter="BAB 3" title="KEKEKALAN MOMENTUM SUDUT" color={iceMeltTheme.colors.primaryCyan} />

          <CameraDrift type="pan-left" intensity={0.05}>
            <AbsoluteFill
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 80px 90px 80px",
                gap: 24,
              }}
            >
              <KineticHeadline
                tag="FISIKA ROTASI"
                mainText="Momen Inersia Planet Melonjak"
                highlightedText="Putaran Bumi Melambat & Hari Bertambah Panjang"
                subtitle="Air terkonsentrasi di khatulistiwa mengacaukan sumbu rotasi dan satelit GPS."
                highlightColor={iceMeltTheme.colors.primaryCyan}
              />

              <EarthRotationGauge />
            </AbsoluteFill>
          </CameraDrift>

          <IceMeltSubtitleBar cues={scenes.scene4.subtitles} />
        </Series.Sequence>

        {/* ========================================================
            SCENE 5: RUNTUHNYA SABUK ARUS SAMUDRA AMOC
            ======================================================== */}
        <Series.Sequence durationInFrames={scenes.scene5.frames}>
          <Audio src={staticFile("vo/ice-melt/scene5.mp3")} volume={1} />
          <Background glowColor="rgba(56, 189, 248, 0.25)" />
          <ChapterBadge chapter="BAB 4" title="PARADOKS IKLIM SAMUDRA" color="#7dd3fc" />

          <CameraDrift type="zoom-in" intensity={0.05}>
            <AbsoluteFill
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 80px 90px 80px",
                gap: 24,
              }}
            >
              <KineticHeadline
                tag="ATLANTIC MERIDIONAL CIRCULATION"
                mainText="Mencairnya Kutub Menghancurkan Arus AMOC"
                highlightedText="Eropa Barat Membeku Hingga -20°C"
                subtitle="Banjir air tawar dingin mematikan pompa termohalin alami pemanas benua."
                highlightColor="#38bdf8"
              />

              <OceanConveyorMap />
            </AbsoluteFill>
          </CameraDrift>

          <IceMeltSubtitleBar cues={scenes.scene5.subtitles} />
        </Series.Sequence>

        {/* ========================================================
            SCENE 6: MONSTER PERMAFROST & PENUTUP REFLEKTIF
            ======================================================== */}
        <Series.Sequence durationInFrames={scenes.scene6.frames}>
          <Audio src={staticFile("vo/ice-melt/scene6.mp3")} volume={1} />
          <Background glowColor="rgba(16, 185, 129, 0.25)" />
          <ChapterBadge chapter="EPILOG" title="BOM WAKTU DI BAWAH TUNDRA" color={iceMeltTheme.colors.methaneGreen} />

          <CameraDrift type="zoom-out" intensity={0.06}>
            <AbsoluteFill
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 80px 90px 80px",
                gap: 24,
              }}
            >
              <KineticHeadline
                tag="PERMAFROST SIBERIA"
                mainText="1.500 Miliar Ton Karbon Terlepas"
                highlightedText="Ledakan Gas Metana & Bangkitnya Mikroba Purba"
                subtitle="Bumi adalah sistem fisika terpadu yang sangat presisi dan rapuh."
                highlightColor={iceMeltTheme.colors.methaneGreen}
              />

              <PermafrostMethane />
            </AbsoluteFill>
          </CameraDrift>

          <IceMeltSubtitleBar cues={scenes.scene6.subtitles} />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
