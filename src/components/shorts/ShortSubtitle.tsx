import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SubtitleCue } from "../../data/lossLeaderShortTiming";
import { financeTheme } from "../../theme/financeTheme";

interface ShortSubtitleProps {
  cues: SubtitleCue[];
}

export const ShortSubtitle: React.FC<ShortSubtitleProps> = ({ cues }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const activeCue = cues.find(
    (cue) => frame >= cue.startFrame && frame <= cue.endFrame
  );

  if (!activeCue) {
    return null;
  }

  const cueAge = frame - activeCue.startFrame;
  const popEntrance = spring({
    frame: cueAge,
    fps,
    config: { damping: 10, stiffness: 220, mass: 0.8 },
  });

  const opacity = interpolate(cueAge, [0, 3], [0, 1], {
    extrapolateRight: "clamp",
  });

  const words = activeCue.text.split(" ");

  return (
    <div
      style={{
        position: "absolute",
        bottom: 420, // Zona aman Shorts / Reels
        left: 40,
        right: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 200,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          background: "rgba(3, 7, 18, 0.94)",
          border: "3px solid #38bdf8",
          boxShadow: "0 16px 40px rgba(0, 0, 0, 0.9), 0 0 30px rgba(56, 189, 248, 0.35)",
          borderRadius: 28,
          padding: "16px 36px",
          display: "inline-flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
          backdropFilter: "blur(16px)",
          transform: `scale(${popEntrance})`,
          opacity,
          fontFamily: financeTheme.fonts.main,
          maxWidth: 960,
        }}
      >
        {words.map((word, idx) => {
          const clean = word.toLowerCase().replace(/[^a-z0-9]/g, "");
          const isGold =
            clean.includes("50") ||
            clean.includes("300") ||
            clean.includes("ribu") ||
            clean.includes("loss") ||
            clean.includes("leader") ||
            clean.includes("supermarket");

          const isRed =
            clean.includes("rugi") ||
            clean.includes("boncos") ||
            clean.includes("mahal");

          const isGreen =
            clean.includes("untung") ||
            clean.includes("persen") ||
            clean.includes("tujuh") ||
            clean.includes("subscribe");

          let color = "#ffffff";
          if (isGold) color = "#fbbf24";
          else if (isRed) color = "#f87171";
          else if (isGreen) color = "#34d399";

          return (
            <span
              key={idx}
              style={{
                fontSize: 48,
                fontWeight: 900,
                color,
                letterSpacing: "-0.01em",
                textTransform: "uppercase",
                textShadow: "0 4px 12px rgba(0, 0, 0, 0.9)",
                display: "inline-block",
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </div>
  );
};
