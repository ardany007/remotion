import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { financeTheme } from "../../theme/financeTheme";

interface KineticHeadlineProps {
  tag?: string;
  mainText: string;
  highlightedText?: string;
  subtitle?: string;
  highlightColor?: string;
}

export const KineticHeadline: React.FC<KineticHeadlineProps> = ({
  tag,
  mainText,
  highlightedText,
  subtitle,
  highlightColor = financeTheme.colors.green,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const scale = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 100 },
  });

  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const subtitleOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        maxWidth: 1300,
        fontFamily: financeTheme.fonts.main,
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      {tag && (
        <span
          style={{
            fontSize: 16,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: highlightColor,
            marginBottom: 16,
            background: `${highlightColor}20`,
            padding: "6px 18px",
            borderRadius: 9999,
            border: `1px solid ${highlightColor}40`,
          }}
        >
          {tag}
        </span>
      )}

      <h1
        style={{
          margin: 0,
          fontSize: 68,
          fontWeight: 900,
          lineHeight: 1.15,
          color: financeTheme.colors.textPrimary,
          letterSpacing: "-0.03em",
        }}
      >
        {mainText}{" "}
        {highlightedText && (
          <span
            style={{
              background: `linear-gradient(135deg, ${highlightColor}, #38bdf8)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {highlightedText}
          </span>
        )}
      </h1>

      {subtitle && (
        <p
          style={{
            margin: "24px 0 0 0",
            fontSize: 26,
            color: financeTheme.colors.textSecondary,
            maxWidth: 900,
            lineHeight: 1.5,
            opacity: subtitleOpacity,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
