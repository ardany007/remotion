import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SubtitleCue } from "../../data/lossLeaderTiming";
import { financeTheme } from "../../theme/financeTheme";

interface SubtitleBarProps {
  cues: SubtitleCue[];
}

export const SubtitleBar: React.FC<SubtitleBarProps> = ({ cues }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cari frasa pendek yang aktif di frame saat ini
  const activeCue = cues.find(
    (cue) => frame >= cue.startFrame && frame <= cue.endFrame
  );

  if (!activeCue) {
    return null;
  }

  // Hitung durasi dan animasi pop-in per frasa kata
  const cueAge = frame - activeCue.startFrame;
  const popEntrance = spring({
    frame: cueAge,
    fps,
    config: { damping: 12, stiffness: 180 },
  });

  const opacity = interpolate(cueAge, [0, 4], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Highlight kata kunci tertentu agar lebih hidup
  const words = activeCue.text.split(" ");

  return (
    <div
      style={{
        position: "absolute",
        bottom: 50,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          background: "rgba(7, 10, 18, 0.92)",
          border: "2px solid rgba(56, 189, 248, 0.5)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(56, 189, 248, 0.2)",
          borderRadius: 9999,
          padding: "12px 32px",
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          backdropFilter: "blur(12px)",
          transform: `scale(${popEntrance})`,
          opacity,
          fontFamily: financeTheme.fonts.main,
        }}
      >
        <span
          style={{
            fontSize: 32,
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "0.02em",
            textTransform: "uppercase",
            textShadow: "0 2px 8px rgba(0, 0, 0, 0.9)",
          }}
        >
          {words.map((w, idx) => {
            const clean = w.toLowerCase().replace(/[^a-z0-9]/g, "");
            const isHighlight =
              clean.includes("rugi") ||
              clean.includes("untung") ||
              clean.includes("miliar") ||
              clean.includes("triliun") ||
              clean.includes("50") ||
              clean.includes("ribu") ||
              clean.includes("loss") ||
              clean.includes("leader") ||
              clean.includes("70") ||
              clean.includes("supermarket") ||
              clean.includes("printer") ||
              clean.includes("konsol");

            return (
              <span
                key={idx}
                style={{
                  color: isHighlight ? financeTheme.colors.gold : "#ffffff",
                  marginRight: 6,
                }}
              >
                {w}
              </span>
            );
          })}
        </span>
      </div>
    </div>
  );
};
