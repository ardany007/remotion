import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { financeTheme } from "../../theme/financeTheme";

interface BackgroundProps {
  glowColor?: string;
  showGrid?: boolean;
}

export const Background: React.FC<BackgroundProps> = ({
  glowColor = financeTheme.colors.greenGlow,
  showGrid = true,
}) => {
  const frame = useCurrentFrame();

  // Animasi halus pergerakan grid & glow
  const glowOpacity = interpolate(
    Math.sin(frame / 25),
    [-1, 1],
    [0.15, 0.28]
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: financeTheme.colors.bgDark,
        overflow: "hidden",
      }}
    >
      {/* Radial Gradient Glow di tengah atas */}
      <div
        style={{
          position: "absolute",
          top: "-15%",
          left: "25%",
          width: "50%",
          height: "60%",
          borderRadius: "50%",
          background: `radial-gradient(ellipse at center, ${glowColor} 0%, transparent 70%)`,
          filter: "blur(90px)",
          opacity: glowOpacity,
          pointerEvents: "none",
        }}
      />

      {/* Grid Finansial Modern (SVG Pattern) */}
      {showGrid && (
        <svg
          width="100%"
          height="100%"
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.12,
            pointerEvents: "none",
          }}
        >
          <defs>
            <pattern
              id="finance-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="0.8"
              />
              <circle cx="60" cy="60" r="1.5" fill="#38bdf8" opacity="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#finance-grid)" />
        </svg>
      )}

      {/* Vignette Gelap di tepi layar untuk fokus penonton */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, transparent 40%, rgba(7, 10, 18, 0.8) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
