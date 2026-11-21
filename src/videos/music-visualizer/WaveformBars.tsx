import React from "react";

interface WaveformBarsProps {
  frequencies: number[];
  barWidth?: number;
  gap?: number;
  glowColor?: string;
}

export const WaveformBars: React.FC<WaveformBarsProps> = ({
  frequencies,
  barWidth = 6,
  gap = 4,
  glowColor = "#38bdf8",
}) => {
  // Ambil 64 sampel frekuensi
  const displaySamples = frequencies.slice(0, 64);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap,
        height: 120,
        width: "100%",
        maxWidth: 900,
        pointerEvents: "none",
      }}
    >
      {displaySamples.map((value, idx) => {
        const height = Math.max(6, value * 110);
        const opacity = Math.min(1, 0.4 + value * 0.7);

        return (
          <div
            key={idx}
            style={{
              width: barWidth,
              height,
              borderRadius: barWidth / 2,
              background: `linear-gradient(to top, rgba(56, 189, 248, 0.2), ${glowColor})`,
              opacity,
              boxShadow: `0 0 12px ${glowColor}50`,
              transition: "height 0.05s ease-out",
            }}
          />
        );
      })}
    </div>
  );
};
