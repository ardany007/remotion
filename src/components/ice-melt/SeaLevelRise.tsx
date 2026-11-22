import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { iceMeltTheme } from "../../theme/iceMeltTheme";

export const SeaLevelRise: React.FC = () => {
  const frame = useCurrentFrame();

  // Water level animation: starts at 0m, rises smoothly to 66m mark
  const waterProgress = interpolate(frame, [15, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const waterHeight = interpolate(waterProgress, [0, 1], [40, 290]);
  const currentMeters = Math.round(interpolate(waterProgress, [0, 1], [0, 66]));
  const waveOffset = Math.sin(frame * 0.1) * 8;

  return (
    <div
      style={{
        display: "flex",
        gap: 48,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        maxWidth: 1400,
      }}
    >
      {/* Visualizer Skyline & Water Level */}
      <div
        style={{
          position: "relative",
          width: 720,
          height: 480,
          background: iceMeltTheme.colors.bgCard,
          border: `1.5px solid ${iceMeltTheme.colors.borderCard}`,
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
        }}
      >
        {/* Sky Background Grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, #020617 0%, #0f172a 100%)",
            opacity: 0.9,
          }}
        />

        {/* Height Meter Marks on the Left */}
        <div
          style={{
            position: "absolute",
            left: 24,
            top: 40,
            bottom: 40,
            width: 80,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            zIndex: 10,
          }}
        >
          {["+70m (Puncak)", "+66m (Global)", "+50m", "+30m", "+10m", "0m (Normal)"].map((lvl, idx) => (
            <div key={idx} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: idx === 1 ? 24 : 12,
                  height: 2,
                  backgroundColor: idx <= 1 ? iceMeltTheme.colors.warningRed : "rgba(255,255,255,0.3)",
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  fontWeight: idx <= 1 ? 800 : 500,
                  color: idx <= 1 ? iceMeltTheme.colors.warningRed : iceMeltTheme.colors.textSecondary,
                  fontFamily: iceMeltTheme.typography.monoFont,
                }}
              >
                {lvl}
              </span>
            </div>
          ))}
        </div>

        {/* City Skyline Silhouette */}
        <svg
          viewBox="0 0 720 480"
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "100%",
            zIndex: 5,
          }}
        >
          {/* Distant Buildings */}
          <rect x="140" y="160" width="45" height="320" fill="#1e293b" />
          <polygon points="162,100 140,160 185,160" fill="#334155" />
          <rect x="200" y="220" width="60" height="260" fill="#1e293b" />
          <rect x="275" y="140" width="75" height="340" fill="#0f172a" />
          <rect x="365" y="180" width="55" height="300" fill="#1e293b" />
          <rect x="435" y="120" width="80" height="360" fill="#0f172a" />
          <polygon points="475,70 435,120 515,120" fill="#334155" />
          <rect x="530" y="210" width="65" height="270" fill="#1e293b" />
          <rect x="610" y="240" width="70" height="240" fill="#0f172a" />

          {/* Windows / Tech Dots */}
          {[160, 220, 290, 380, 450, 550, 630].map((x, col) => (
            <g key={col} opacity={0.6}>
              <circle cx={x + 10} cy="260" r="2.5" fill="#facc15" />
              <circle cx={x + 25} cy="260" r="2.5" fill="#facc15" />
              <circle cx={x + 10} cy="280" r="2.5" fill="#facc15" />
              <circle cx={x + 25} cy="280" r="2.5" fill="#facc15" />
              <circle cx={x + 10} cy="310" r="2.5" fill="#facc15" />
              <circle cx={x + 25} cy="310" r="2.5" fill="#facc15" />
            </g>
          ))}
        </svg>

        {/* Rising Ocean Water Layer */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: waterHeight,
            background: "linear-gradient(180deg, rgba(56, 189, 248, 0.75) 0%, rgba(2, 132, 199, 0.9) 40%, rgba(3, 105, 161, 0.98) 100%)",
            backdropFilter: "blur(4px)",
            zIndex: 8,
            boxShadow: `0 -10px 30px ${iceMeltTheme.colors.cyanGlow}`,
            transition: "height 0.1s linear",
          }}
        >
          {/* Water Surface Wave Line */}
          <div
            style={{
              position: "absolute",
              top: -6 + waveOffset,
              left: 0,
              right: 0,
              height: 12,
              background: "rgba(255, 255, 255, 0.6)",
              filter: "blur(2px)",
            }}
          />
        </div>

        {/* Active Elevation Badge */}
        <div
          style={{
            position: "absolute",
            top: 24,
            right: 24,
            backgroundColor: currentMeters >= 60 ? "rgba(239, 68, 68, 0.2)" : "rgba(56, 189, 248, 0.2)",
            border: `2px solid ${currentMeters >= 60 ? iceMeltTheme.colors.warningRed : iceMeltTheme.colors.primaryCyan}`,
            borderRadius: 16,
            padding: "12px 24px",
            zIndex: 20,
            display: "flex",
            alignItems: "center",
            gap: 12,
            boxShadow: `0 0 25px ${currentMeters >= 60 ? iceMeltTheme.colors.warningRedGlow : iceMeltTheme.colors.cyanGlow}`,
          }}
        >
          <span style={{ fontSize: 13, color: "#cbd5e1", fontWeight: 700 }}>KENAIKAN LAUT:</span>
          <span
            style={{
              fontSize: 32,
              fontWeight: 900,
              color: currentMeters >= 60 ? "#fca5a5" : "#38bdf8",
              fontFamily: iceMeltTheme.typography.monoFont,
            }}
          >
            +{currentMeters} METER
          </span>
        </div>
      </div>

      {/* Info Cards Side Panel */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20, width: 440 }}>
        <div
          style={{
            background: iceMeltTheme.colors.bgCard,
            border: `1.5px solid ${iceMeltTheme.colors.borderCard}`,
            borderRadius: 20,
            padding: "24px 28px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
          }}
        >
          <div style={{ fontSize: 13, color: iceMeltTheme.colors.primaryCyan, fontWeight: 800, letterSpacing: 1.2 }}>
            HUKUM ARCHIMEDES DASAR
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#ffffff", marginTop: 6 }}>
            Es Terapung vs Es Daratan
          </div>
          <p style={{ fontSize: 14, color: iceMeltTheme.colors.textSecondary, marginTop: 8, lineHeight: 1.5 }}>
            Es Kutub Utara mengapung di air—melelehnya tidak menaikkan volume laut. Tapi es Greenland & Antarktika duduk di atas batuan daratan setebal 2 kilometer.
          </p>
        </div>

        <div
          style={{
            background: "rgba(239, 68, 68, 0.12)",
            border: `1.5px solid ${iceMeltTheme.colors.warningRed}`,
            borderRadius: 20,
            padding: "24px 28px",
            boxShadow: `0 0 30px ${iceMeltTheme.colors.warningRedGlow}`,
          }}
        >
          <div style={{ fontSize: 13, color: "#fca5a5", fontWeight: 800, letterSpacing: 1.2 }}>
            DAMPAK DEMOGRAFI GLOBAL
          </div>
          <div style={{ fontSize: 28, fontWeight: 900, color: "#ffffff", marginTop: 4 }}>
            &gt; 40% Populasi Dunia
          </div>
          <p style={{ fontSize: 14, color: "#fecaca", marginTop: 6, lineHeight: 1.5 }}>
            Jakarta, Tokyo, New York, London, Singapura, dan Belanda langsung tenggelam permanen di bawah laut.
          </p>
        </div>
      </div>
    </div>
  );
};
