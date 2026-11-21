import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { financeTheme } from "../../theme/financeTheme";

interface ChapterBadgeProps {
  chapter: string | number;
  title: string;
  color?: string;
}

export const ChapterBadge: React.FC<ChapterBadgeProps> = ({
  chapter,
  title,
  color = financeTheme.colors.green,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring animation dari atas
  const entrance = spring({
    frame,
    fps,
    config: {
      damping: 14,
      stiffness: 120,
    },
  });

  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 60,
        left: 80,
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "10px 22px",
        borderRadius: 9999,
        background: "rgba(15, 23, 42, 0.75)",
        border: "1px solid rgba(51, 65, 85, 0.8)",
        backdropFilter: "blur(12px)",
        transform: `translateY(${(1 - entrance) * -30}px)`,
        opacity,
        fontFamily: financeTheme.fonts.main,
        zIndex: 50,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: "rgba(30, 41, 59, 0.9)",
          padding: "4px 10px",
          borderRadius: 9999,
          border: `1px solid ${color}40`,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}`,
          }}
        />
        <span
          style={{
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: "0.08em",
            color,
            textTransform: "uppercase",
            fontFamily: financeTheme.fonts.mono,
          }}
        >
          BAB {chapter}
        </span>
      </div>

      <span
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: financeTheme.colors.textPrimary,
          letterSpacing: "0.02em",
        }}
      >
        {title}
      </span>
    </div>
  );
};
