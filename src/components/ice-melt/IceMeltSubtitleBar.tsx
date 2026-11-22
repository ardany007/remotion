import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SubtitleCue } from "../../data/iceMeltTiming";
import { iceMeltTheme } from "../../theme/iceMeltTheme";

interface IceMeltSubtitleBarProps {
  cues: SubtitleCue[];
}

export const IceMeltSubtitleBar: React.FC<IceMeltSubtitleBarProps> = ({ cues }) => {
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
    config: { damping: 12, stiffness: 180 },
  });

  const opacity = interpolate(cueAge, [0, 4], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 54,
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
          background: "rgba(5, 9, 20, 0.9)",
          border: `1.5px solid ${iceMeltTheme.colors.primaryCyan}`,
          borderRadius: 18,
          padding: "14px 36px",
          boxShadow: `0 0 35px ${iceMeltTheme.colors.cyanGlow}, 0 10px 25px rgba(0, 0, 0, 0.7)`,
          transform: `scale(${popEntrance})`,
          opacity,
          maxWidth: "85%",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontSize: 26,
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: 0.5,
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
          }}
        >
          {activeCue.text}
        </span>
      </div>
    </div>
  );
};
