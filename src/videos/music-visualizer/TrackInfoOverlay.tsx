import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { financeTheme } from "../../theme/financeTheme";

interface TrackInfoOverlayProps {
  title: string;
  artist?: string;
  genreBadge?: string;
  accentColor?: string;
}

export const TrackInfoOverlay: React.FC<TrackInfoOverlayProps> = ({
  title,
  artist = "Ardany Music",
  genreBadge = "CINEMATIC PIANO • DEEP FOCUS & SLEEP",
  accentColor = "#38bdf8",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // Hitung menit dan detik yang sedang berjalan
  const currentSeconds = Math.floor(frame / fps);
  const totalSeconds = Math.floor(durationInFrames / fps);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const progressPercent = Math.min(100, (frame / durationInFrames) * 100);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "60px 80px",
        pointerEvents: "none",
        fontFamily: financeTheme.fonts.main,
      }}
    >
      {/* Top Header: Badge Genre & Artist Branding */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div
          style={{
            background: "rgba(15, 23, 42, 0.75)",
            border: `1.5px solid ${accentColor}60`,
            borderRadius: 9999,
            padding: "8px 24px",
            color: accentColor,
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            boxShadow: `0 0 20px ${accentColor}25`,
            backdropFilter: "blur(12px)",
          }}
        >
          {genreBadge}
        </div>

        <div
          style={{
            color: "#94a3b8",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          CHANNEL: <span style={{ color: "#ffffff" }}>{artist}</span>
        </div>
      </div>

      {/* Center-Lower Section: Track Title & Timeline */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          marginBottom: 30,
        }}
      >
        <div
          style={{
            fontSize: 44,
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            textShadow: "0 4px 20px rgba(0, 0, 0, 0.9)",
            textAlign: "center",
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: "#cbd5e1",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            opacity: 0.85,
          }}
        >
          AI Composed via Suno • Reactive Visualizer by Remotion
        </div>

        {/* Audio Progress Timeline Bar */}
        <div style={{ width: "100%", maxWidth: 640, marginTop: 12 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 13,
              fontWeight: 700,
              color: "#94a3b8",
              fontFamily: financeTheme.fonts.mono,
              marginBottom: 8,
            }}
          >
            <span>{formatTime(currentSeconds)}</span>
            <span>{formatTime(totalSeconds)}</span>
          </div>

          <div
            style={{
              width: "100%",
              height: 4,
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: "100%",
                background: `linear-gradient(to right, ${accentColor}80, ${accentColor})`,
                boxShadow: `0 0 10px ${accentColor}`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
