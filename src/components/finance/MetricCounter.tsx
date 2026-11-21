import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { financeTheme } from "../../theme/financeTheme";

interface MetricCounterProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  trendPercent?: number;
  trendLabel?: string;
  subtitle?: string;
  delay?: number;
}

export const MetricCounter: React.FC<MetricCounterProps> = ({
  label,
  value,
  prefix = "$",
  suffix = "",
  trendPercent,
  trendLabel = "YoY",
  subtitle,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);

  // Spring card entrance
  const cardScale = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 15, stiffness: 110 },
  });

  const cardOpacity = interpolate(adjustedFrame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Animated counter progression (berjalan selama ~40 frames)
  const countProgress = interpolate(adjustedFrame, [10, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const displayValue = Math.round(value * countProgress).toLocaleString("id-ID");

  const isPositive = (trendPercent ?? 0) >= 0;
  const trendColor = isPositive ? financeTheme.colors.green : financeTheme.colors.red;

  return (
    <div
      style={{
        background: financeTheme.colors.bgCard,
        border: `1px solid ${financeTheme.colors.borderCard}`,
        boxShadow: `0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)`,
        borderRadius: 24,
        padding: "36px 48px",
        minWidth: 420,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        transform: `scale(${cardScale})`,
        opacity: cardOpacity,
        fontFamily: financeTheme.fonts.main,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: financeTheme.colors.textSecondary,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>

        {trendPercent !== undefined && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "4px 12px",
              borderRadius: 9999,
              background: isPositive ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
              border: `1px solid ${trendColor}40`,
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 700, color: trendColor }}>
              {isPositive ? "▲ +" : "▼ "}
              {Math.abs(trendPercent)}%
            </span>
            <span style={{ fontSize: 12, color: financeTheme.colors.textMuted }}>
              {trendLabel}
            </span>
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 6,
          fontFamily: financeTheme.fonts.mono,
        }}
      >
        <span
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: financeTheme.colors.gold,
          }}
        >
          {prefix}
        </span>
        <span
          style={{
            fontSize: 68,
            fontWeight: 800,
            color: financeTheme.colors.textPrimary,
            letterSpacing: "-0.02em",
          }}
        >
          {displayValue}
        </span>
        {suffix && (
          <span
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: financeTheme.colors.textSecondary,
              marginLeft: 4,
            }}
          >
            {suffix}
          </span>
        )}
      </div>

      {subtitle && (
        <span
          style={{
            fontSize: 16,
            color: financeTheme.colors.textMuted,
            marginTop: 4,
          }}
        >
          {subtitle}
        </span>
      )}
    </div>
  );
};
