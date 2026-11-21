import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { financeTheme } from "../../theme/financeTheme";

interface ComparisonCardProps {
  leftTitle: string;
  leftSubtitle?: string;
  leftPoints: string[];
  rightTitle: string;
  rightSubtitle?: string;
  rightPoints: string[];
  delay?: number;
}

export const ComparisonCard: React.FC<ComparisonCardProps> = ({
  leftTitle,
  leftSubtitle,
  leftPoints,
  rightTitle,
  rightSubtitle,
  rightPoints,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);

  const entrance = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const opacity = interpolate(adjustedFrame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        gap: 32,
        maxWidth: 1200,
        width: "100%",
        transform: `scale(${entrance})`,
        opacity,
        fontFamily: financeTheme.fonts.main,
      }}
    >
      {/* Kolom Kiri (Misal: Aset / Keunggulan) */}
      <div
        style={{
          flex: 1,
          background: financeTheme.colors.bgCard,
          border: `1.5px solid ${financeTheme.colors.green}50`,
          boxShadow: `0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px ${financeTheme.colors.greenGlow}`,
          borderRadius: 24,
          padding: "36px 40px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: financeTheme.colors.green,
              boxShadow: `0 0 10px ${financeTheme.colors.green}`,
            }}
          />
          <h3
            style={{
              margin: 0,
              fontSize: 28,
              fontWeight: 800,
              color: financeTheme.colors.textPrimary,
            }}
          >
            {leftTitle}
          </h3>
        </div>
        {leftSubtitle && (
          <p style={{ margin: "0 0 24px 0", color: financeTheme.colors.textSecondary, fontSize: 16 }}>
            {leftSubtitle}
          </p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {leftPoints.map((point, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <span style={{ color: financeTheme.colors.green, fontWeight: 800, fontSize: 18 }}>✓</span>
              <span style={{ color: financeTheme.colors.textPrimary, fontSize: 18, lineHeight: 1.5 }}>
                {point}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Kolom Kanan (Misal: Liabilitas / Model Tradisional) */}
      <div
        style={{
          flex: 1,
          background: financeTheme.colors.bgCard,
          border: `1.5px solid ${financeTheme.colors.borderCard}`,
          borderRadius: 24,
          padding: "36px 40px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: financeTheme.colors.red,
            }}
          />
          <h3
            style={{
              margin: 0,
              fontSize: 28,
              fontWeight: 800,
              color: financeTheme.colors.textPrimary,
            }}
          >
            {rightTitle}
          </h3>
        </div>
        {rightSubtitle && (
          <p style={{ margin: "0 0 24px 0", color: financeTheme.colors.textSecondary, fontSize: 16 }}>
            {rightSubtitle}
          </p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {rightPoints.map((point, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <span style={{ color: financeTheme.colors.red, fontWeight: 800, fontSize: 18 }}>✕</span>
              <span style={{ color: financeTheme.colors.textSecondary, fontSize: 18, lineHeight: 1.5 }}>
                {point}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
